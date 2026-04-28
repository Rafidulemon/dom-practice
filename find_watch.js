(function () {
	let watches = [];
	
	async function fetchWatches() {
	  const menRes = await fetch("https://dummyjson.com/products/category/mens-watches");
	  const womenRes = await fetch("https://dummyjson.com/products/category/womens-watches");
	
	  const menData = await menRes.json();
	  const womenData = await womenRes.json();
	
	  const apiWatches = [...menData.products, ...womenData.products];
	
	  watches = apiWatches.map((watch, index) => ({
	    id: watch.id,
	    name: watch.title,
	    price: watch.price,
	    image: watch.thumbnail,
	    dial: ["Analog", "Digital", "Smart", "Chronograph"][index % 4],
	    handSize: ["30–35", "36–42", "43-50"][index % 3],
	    dialColor: ["Black", "White", "Blue", "Gold", "Silver"][index % 5],
	    strapColor: ["Black", "Brown", "Blue", "Gold", "Silver"][index % 5],
	  }));
	}
  
  const budget = ["Under 3000", "3000 - 5000", "5000 - 10000", "Above 10000"];
  const dialType = ["Analog", "Digital", "Smart", "Chronograph"]; 
  const handSize = ["30–35", "36–42", "43-50"];
  const dialColor = [ { name: "Black", colorCode: "#000000" }, { name: "White", colorCode: "#FFFFFF" }, { name: "Blue", colorCode: "#0000FF" }, { name: "Gold", colorCode: "#FFD700" }, { name: "Silver", colorCode: "#C0C0C0" }, ];
  const strapColor = [ { name: "Black", colorCode: "#000000" }, { name: "Brown", colorCode: "#964B00" }, { name: "Blue", colorCode: "#0000FF" }, { name: "Gold", colorCode: "#FFD700" }, { name: "Silver", colorCode: "#C0C0C0" }, ];
  
  const steps = [
  {
    question: "Please select the price range",
    options: budget,
    key: "budget",
  },
  {
    question: "Please select Dial Type",
    options: dialType,
    key: "dial",
  },
  {
    question: "What's your hand size",
    options: handSize,
    key: "handSize",
  },
  {
    question: "Please select the Dial Color",
    options: dialColor,
    key: "dialColor",
  },
  {
    question: "Please select strap color",
    options: strapColor,
    key: "strapColor",
  },
];
  
  const rootDiv = document.createElement("div");
  rootDiv.classList.add("root-div");

  const el = document.querySelector(".experience-component.experience-layouts-herocarousel");

  if (!el) {
    console.log("Target element not found");
    return;
  }

  el.after(rootDiv);

  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = "Watch Finder";
  rootDiv.appendChild(title);

  const subtitle = document.createElement("h4");
  subtitle.classList.add("subtitle");
  subtitle.textContent = "FIND THE WATCH THAT SUITS YOU BEST";
  rootDiv.appendChild(subtitle);

  const startBtn = document.createElement("button");
  startBtn.classList.add("startBtn");
  startBtn.textContent = "Start Finding";
  rootDiv.appendChild(startBtn);

  startBtn.addEventListener('click', async (e)=>{
  	e.preventDefault();
  	startBtn.disabled = true;
  	startBtn.textContent = "Loading...";

  	await fetchWatches();

  	startBtn.style.display = "none";
  	
  	let currentStep = 0;
  	const answers = {};
  	
  	const questionEl = document.createElement("h3");
  	questionEl.classList.add("question-title");
  	
  	const optionWrapper = document.createElement("div");
  	optionWrapper.classList.add("options-wrapper");
  	
   	const navWrapper = document.createElement("div");
  	navWrapper.classList.add("nav-wrapper");
  	
  	const prevBtn = document.createElement("button")
  	prevBtn.classList.add("nav-btn")
  	prevBtn.innerHTML = "Previous";
  	
  	const nextBtn = document.createElement("button")
  	nextBtn.classList.add("nav-btn")
  	nextBtn.innerHTML = "Next"; 
  	
  	navWrapper.appendChild(prevBtn);
  	navWrapper.appendChild(nextBtn);
  	
  	const matchText = document.createElement("h4");
		matchText.classList.add("match-text");
		rootDiv.appendChild(matchText);
  	
  	rootDiv.appendChild(questionEl);
  	rootDiv.appendChild(optionWrapper);
  	rootDiv.appendChild(navWrapper);
  	
		function filterWatches() {
		  return watches.filter((watch) => {
		    return (
		      (!answers.budget || matchBudget(watch.price, answers.budget)) &&
		      (!answers.dial || watch.dial === answers.dial) &&
		      (!answers.handSize || watch.handSize === answers.handSize) &&
		      (!answers.dialColor || watch.dialColor === answers.dialColor) &&
		      (!answers.strapColor || watch.strapColor === answers.strapColor)
		    );
		  });
		}
		
		function matchBudget(price, selected) {
		  if (selected === "Under 3000") return price < 3000;
		  if (selected === "3000 - 5000") return price >= 3000 && price <= 5000;
		  if (selected === "5000 - 10000") return price >= 5000 && price <= 10000;
		  if (selected === "Above 10000") return price > 10000;
		  return true;
		}
		
		function showFinalResults() {
		  const matchedWatches = filterWatches();
		
		  questionEl.textContent = "Matched Watches";
		  optionWrapper.innerHTML = "";
		  navWrapper.style.display = "none";
		
		  matchText.textContent = `${matchedWatches.length} matches`;
		
		  matchedWatches.forEach((watch) => {
		    const card = document.createElement("div");
		    card.classList.add("watch-card");
		
		    card.innerHTML = `
		      <img src="${watch.image}" alt="${watch.name}" class="watch-img" />
		      <h4>${watch.name}</h4>
		      <p>Price: ${watch.price}</p>
		      <p>Dial: ${watch.dial}</p>
		      <p>Hand Size: ${watch.handSize}</p>
		      <p>Dial Color: ${watch.dialColor}</p>
		      <p>Strap Color: ${watch.strapColor}</p>
		    `;
		
		    optionWrapper.appendChild(card);
		  });
		}
  	
  	
  	function renderStep() {
  		const step = steps[currentStep];
    	questionEl.textContent = step.question;
    	optionWrapper.innerHTML = ""
    	
    	step.options.forEach((option) => {
    		const value = typeof option === "string" ? option : option.name;
    		
    		const optionBtn = document.createElement("button");
    		optionBtn.classList.add("option-btn");
    		optionBtn.textContent = value;
    		
    		if (answers[step.key] === value){
    			optionBtn.classList.add("selected");
    		}
    		
    		optionBtn.addEventListener('click', ()=> {
    			answers[step.key] = value;
    			renderStep();
    		});
    		
    		optionWrapper.appendChild(optionBtn);
    	})
    	
    	prevBtn.disabled = currentStep === 0;
    	nextBtn.disabled = !answers[step.key];
    		
    	nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
    	const filtered = filterWatches();
			matchText.textContent = `${filtered.length} matches`;
  	}
  	
  	prevBtn.addEventListener('click', (e)=>{
  		if(currentStep > 0){
  			currentStep--;
  			renderStep();
  		}
  	});
  	
  	nextBtn.addEventListener('click', (e)=> {
  		if(!answers[steps[currentStep].key]) return;
  		if(currentStep < steps.length -1) {
  			currentStep++;
  			console.log("currentStep: ", currentStep)
  			renderStep();
  		}
  		else {
  			showFinalResults()
  		}
  	})  	
  	
  	renderStep();
  })
})();
