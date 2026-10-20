const { useState, useEffect, useMemo, useRef } = React;

    const starterRecipes = [
      { id:"lemon-chickpea-bowl", name:"Lemony Chickpea Bowls", description:"A bright, satisfying bowl with crispy chickpeas, cool cucumber and a quick lemony dressing.", ingredients:[["chickpeas",1,"can"],["cucumber",1,""],["lemon",1,""],["olive oil",2,"tbsp"],["garlic",1,"clove"],["yogurt",0.5,"cup",true],["parsley",2,"tbsp",true]], instructions:["Drain and rinse the chickpeas, then pat them dry. Toss with olive oil, salt and pepper.","Roast at 425°F (220°C) for 20–25 minutes, shaking once, until golden and crisp.","Stir lemon juice and finely grated garlic into yogurt, if using. Thin with a splash of water.","Slice the cucumber and serve with chickpeas, dressing and parsley."], servings:2, prepMinutes:15, cookMinutes:25, difficulty:"Easy", dietaryTags:["Vegetarian","Gluten-free"], isCustom:false },
      { id:"tomato-egg-skillet", name:"Tomato & Egg Skillet", description:"Jammy eggs simmered in a warmly spiced tomato sauce. A one-pan favorite for any time of day.", ingredients:[["eggs",4,""],["tomatoes",3,""],["onion",1,""],["garlic",2,"cloves"],["olive oil",1,"tbsp"],["paprika",1,"tsp"],["spinach",2,"cups",true]], instructions:["Dice the onion and tomatoes. Warm olive oil in a skillet over medium heat.","Cook onion for 5 minutes until soft. Add garlic and paprika and stir for 30 seconds.","Add tomatoes and simmer for 10–12 minutes until saucy. Fold in spinach if using.","Make four small wells, crack an egg into each and cover. Cook 5–7 minutes, until set to your liking."], servings:2, prepMinutes:10, cookMinutes:25, difficulty:"Easy", dietaryTags:["Vegetarian","Gluten-free"], isCustom:false },
      { id:"creamy-spinach-pasta", name:"Creamy Spinach Pasta", description:"A weeknight pasta with tender greens and a silky parmesan sauce made right in the pan.", ingredients:[["pasta",250,"g"],["spinach",3,"cups"],["garlic",2,"cloves"],["parmesan",0.5,"cup"],["cream",0.5,"cup"],["olive oil",1,"tbsp"],["lemon",0.5,""],["butter",1,"tbsp",true]], instructions:["Bring a pot of salted water to a boil and cook pasta until just tender. Reserve ½ cup pasta water.","Warm olive oil in a large pan. Add garlic and cook until fragrant, about 30 seconds.","Stir in cream and a splash of pasta water. Add spinach and let it wilt.","Toss in drained pasta and parmesan. Finish with lemon juice and butter if you like."], servings:2, prepMinutes:10, cookMinutes:20, difficulty:"Easy", dietaryTags:["Vegetarian"], isCustom:false },
      { id:"roasted-veg-tacos", name:"Roasted Veggie Tacos", description:"Colorful, hands-off roasted vegetables tucked into warm tortillas with a zippy lime finish.", ingredients:[["bell pepper",2,""],["zucchini",1,""],["red onion",1,""],["tortillas",8,""],["olive oil",1,"tbsp"],["lime",1,""],["black beans",1,"can",true],["avocado",1,"",true]], instructions:["Heat oven to 425°F (220°C). Slice the peppers, zucchini and onion into strips.","Toss vegetables with olive oil, salt and pepper, then spread on a baking sheet.","Roast for 20–25 minutes, turning once, until tender and browned at the edges.","Warm tortillas and fill with vegetables. Serve with lime and optional beans or avocado."], servings:4, prepMinutes:15, cookMinutes:25, difficulty:"Easy", dietaryTags:["Vegan","Vegetarian","Dairy-free"], isCustom:false },
      { id:"garlic-chicken-rice", name:"Garlic Chicken & Rice", description:"Golden chicken and fluffy rice come together in one pot for a comforting, no-fuss supper.", ingredients:[["chicken",500,"g"],["rice",1,"cup"],["chicken broth",2,"cups"],["garlic",3,"cloves"],["onion",1,""],["olive oil",1,"tbsp"],["lemon",0.5,"",true]], instructions:["Season chicken with salt and pepper. Heat oil in a heavy pot and brown chicken on both sides; set aside.","Cook chopped onion in the same pot for 4 minutes. Add garlic and rice, stirring for 1 minute.","Pour in broth and return chicken to the pot. Bring to a simmer, then cover.","Cook gently for 18–20 minutes, until rice is tender and chicken is cooked through. Rest 5 minutes."], servings:4, prepMinutes:15, cookMinutes:30, difficulty:"Medium", dietaryTags:["Gluten-free","Dairy-free"], isCustom:false },
      { id:"apple-oat-pancakes", name:"Apple Oat Pancakes", description:"Tender, gently spiced pancakes with grated apple and oats—a cozy breakfast worth slowing down for.", ingredients:[["oats",1,"cup"],["apple",1,""],["eggs",2,""],["milk",0.75,"cup"],["flour",0.5,"cup"],["baking powder",1,"tsp"],["cinnamon",0.5,"tsp"],["maple syrup",2,"tbsp",true]], instructions:["Blend oats into a coarse flour, or leave them whole for more texture.","Whisk eggs, milk and grated apple. Stir in oats, flour, baking powder and cinnamon.","Warm a lightly oiled pan over medium-low heat. Spoon batter into small pancakes.","Cook until bubbles appear, flip and cook until golden. Serve with maple syrup if desired."], servings:3, prepMinutes:10, cookMinutes:15, difficulty:"Easy", dietaryTags:["Vegetarian"], isCustom:false },
      { id:"lentil-coconut-soup", name:"Coconut Lentil Soup", description:"A nourishing pot of red lentils, warming spices and creamy coconut milk, finished with fresh lime.", ingredients:[["red lentils",1,"cup"],["coconut milk",1,"can"],["vegetable broth",3,"cups"],["onion",1,""],["garlic",2,"cloves"],["curry powder",1,"tbsp"],["lime",1,""],["spinach",2,"cups",true]], instructions:["Rinse lentils. Dice onion and mince garlic.","Cook onion in a splash of oil until soft. Stir in garlic and curry powder for 30 seconds.","Add lentils, coconut milk and broth. Bring to a boil, then simmer 20–25 minutes until tender.","Stir in spinach if using, season to taste and finish with lime juice."], servings:4, prepMinutes:10, cookMinutes:30, difficulty:"Easy", dietaryTags:["Vegan","Vegetarian","Gluten-free","Dairy-free"], isCustom:false },
      { id:"salmon-lemon-traybake", name:"Lemon Salmon Traybake", description:"Flaky salmon and crisp potatoes roast together with lemon for a simple, fresh dinner.", ingredients:[["salmon",2,"fillets"],["potatoes",500,"g"],["lemon",1,""],["olive oil",2,"tbsp"],["garlic",2,"cloves"],["green beans",200,"g",true],["dill",1,"tbsp",true]], instructions:["Heat oven to 425°F (220°C). Cut potatoes into small pieces and toss with olive oil, garlic, salt and pepper.","Roast potatoes on a sheet pan for 20 minutes, turning once.","Nestle salmon and optional green beans among the potatoes. Add lemon slices.","Roast 10–12 minutes more, until salmon flakes easily. Finish with dill if available."], servings:2, prepMinutes:10, cookMinutes:32, difficulty:"Easy", dietaryTags:["Gluten-free","Dairy-free"], isCustom:false }
    ];

    const TAGS = ["Vegetarian","Vegan","Gluten-free","Dairy-free"];
    const uid = () => (window.crypto && crypto.randomUUID ? crypto.randomUUID() : "id-" + Date.now() + "-" + Math.random().toString(16).slice(2));
    const norm = s => String(s || "").trim().toLowerCase().replace(/\s+/g," ");
    const readStore = (key, fallback) => { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
    const writeStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
    const recipeTotal = r => (Number(r.prepMinutes)||0) + (Number(r.cookMinutes)||0);
    const toRecipe = raw => ({...raw, ingredients:(raw.ingredients||[]).map((i,index)=>Array.isArray(i)?({id:uid(),name:i[0],quantity:i[1],unit:i[2]||null,isOptional:!!i[3]}):({...i,id:i.id||uid()}))});

    function App() {
      const [ingredients,setIngredients] = useState(() => readStore("recipeApp.ingredients", []));
      const [preferences,setPreferences] = useState(() => ({maxTotalMinutes:null,dietaryTags:[],onlyCookableRecipes:false,sortBy:"Best match",...readStore("recipeApp.preferences",{})}));
      const [saved,setSaved] = useState(() => readStore("recipeApp.saved", []));
      const [custom,setCustom] = useState(() => readStore("recipeApp.customRecipes", []));
      const [view,setView] = useState("recommendations");
      const [query,setQuery] = useState("");
      const [input,setInput] = useState("");
      const [notice,setNotice] = useState("");
      const [pageState,setPageState] = useState("loading");
      const [detailId,setDetailId] = useState(null);
      const [editorRecipe,setEditorRecipe] = useState(null);
      const [servings,setServings] = useState(1);
      const [deleteTarget,setDeleteTarget] = useState(null);
      const [formError,setFormError] = useState("");
      const [fieldErrors,setFieldErrors] = useState({});
      const [saveError,setSaveError] = useState("");
      const inputRef = useRef(null);
      const chipRefs = useRef([]);
      const allRecipes = useMemo(() => [...starterRecipes.map(toRecipe), ...custom.map(toRecipe)], [custom]);

      useEffect(() => { writeStore("recipeApp.ingredients",ingredients); },[ingredients]);
      useEffect(() => { writeStore("recipeApp.preferences",preferences); },[preferences]);
      useEffect(() => { writeStore("recipeApp.saved",saved); },[saved]);
      useEffect(() => { writeStore("recipeApp.customRecipes",custom); },[custom]);
      useEffect(() => { const t=setTimeout(()=>setPageState("ready"),320); return ()=>clearTimeout(t); },[view]);

      const recipeById = id => allRecipes.find(r=>r.id===id);
      const matchFor = recipe => {
        const names=new Set(ingredients.map(x=>x.normalizedName || norm(x.name)));
        const required=recipe.ingredients.filter(i=>!i.isOptional);
        const matched=required.filter(i=>names.has(norm(i.name))).length;
        const missing=required.filter(i=>!names.has(norm(i.name))).map(i=>i.name);
        return {recipeId:recipe.id,matchedIngredientCount:matched,requiredIngredientCount:required.length,missingIngredients:missing,matchPercentage:required.length?Math.round(matched/required.length*100):0,isCookable:missing.length===0};
      };
      const recommendationResults = useMemo(() => {
        const results=allRecipes.map(recipe=>({recipe,...matchFor(recipe)}))
          .filter(x=>x.matchedIngredientCount>0)
          .filter(x=>preferences.maxTotalMinutes==null || recipeTotal(x.recipe)<=Number(preferences.maxTotalMinutes))
          .filter(x=>preferences.dietaryTags.every(t=>x.recipe.dietaryTags.includes(t)))
          .filter(x=>!preferences.onlyCookableRecipes || x.isCookable);
        if(preferences.sortBy==="Shortest time") results.sort((a,b)=>recipeTotal(a.recipe)-recipeTotal(b.recipe)||b.matchPercentage-a.matchPercentage||a.recipe.name.localeCompare(b.recipe.name));
        else if(preferences.sortBy==="Fewest missing") results.sort((a,b)=>a.missingIngredients.length-b.missingIngredients.length||b.matchPercentage-a.matchPercentage||recipeTotal(a.recipe)-recipeTotal(b.recipe)||a.recipe.name.localeCompare(b.recipe.name));
        else results.sort((a,b)=>b.matchPercentage-a.matchPercentage||a.missingIngredients.length-b.missingIngredients.length||recipeTotal(a.recipe)-recipeTotal(b.recipe)||a.recipe.name.localeCompare(b.recipe.name));
        return results;
      },[allRecipes,ingredients,preferences]);
      const savedResults = useMemo(() => {
        const search=norm(query);
        let list=saved.map(s=>recipeById(s.recipeId)).filter(Boolean).filter(r=>!search || r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search));
        if(preferences.savedSort==="Prep time") list.sort((a,b)=>recipeTotal(a)-recipeTotal(b)||a.name.localeCompare(b.name));
        else list.sort((a,b)=>a.name.localeCompare(b.name));
        return list;
      },[saved,allRecipes,query,preferences.savedSort]);

      function flash(message) { setNotice(message); window.clearTimeout(flash.timer); flash.timer=window.setTimeout(()=>setNotice(""),2400); }
      function addIngredient(raw=input) {
        const name=String(raw||"").trim().replace(/,+$/,"").trim();
        if(!name) { setInput(""); return; }
        if(ingredients.some(x=>(x.normalizedName||norm(x.name))===norm(name))) { flash("That ingredient is already on your list.");setInput("");return; }
        setIngredients(prev=>[...prev,{id:uid(),name,normalizedName:norm(name)}]);
        setInput("");
        setPageState("ready");
      }
      function removeIngredient(id) { setIngredients(prev=>prev.filter(x=>x.id!==id)); }
      function clearIngredients() {
        if(!ingredients.length) return;
        if(window.confirm("Clear all entered ingredients? Saved and personal recipes will stay untouched.")) { setIngredients([]);flash("Ingredient list cleared."); }
      }
      function toggleSave(id) {
        const exists=saved.some(s=>s.recipeId===id);
        setSaved(prev=>exists?prev.filter(s=>s.recipeId!==id):[...prev,{recipeId:id,savedAt:new Date().toISOString()}]);
        flash(exists?"Recipe removed from saved.":"Recipe saved for later.");
      }
      function openDetail(id) { setDetailId(id); const r=recipeById(id);setServings(r?.servings||1);setView("detail");setPageState("loading"); }
      function startNew() { setEditorRecipe(null);setFormError("");setFieldErrors({});setSaveError("");setView("editor"); }
      function startEdit(recipe) { setEditorRecipe(recipe);setFormError("");setFieldErrors({});setSaveError("");setView("editor"); }
      function backFromDetail() { setView(detailFromSaved.current?"saved":"recommendations"); }
      const detailFromSaved = useRef(false);
      function showDetail(id, fromSaved=false) { detailFromSaved.current=fromSaved;openDetail(id); }
      function returnToResults() { setView(detailFromSaved.current?"saved":"recommendations"); }

      function updatePref(key,value) { setPreferences(prev=>({...prev,[key]:value})); }
      function clearFilters() { setPreferences(prev=>({...prev,maxTotalMinutes:null,dietaryTags:[],onlyCookableRecipes:false}));flash("Filters cleared."); }

      function createInitialForm() {
        return {name:"",description:"",ingredients:[{id:uid(),name:"",quantity:"",unit:"",isOptional:false}],instructions:[""],servings:2,prepMinutes:10,cookMinutes:20,difficulty:"Easy",dietaryTags:[]};
      }
      const [form,setForm] = useState(createInitialForm);
      useEffect(()=>{ if(view==="editor") {
        setForm(editorRecipe ? {...editorRecipe,ingredients:editorRecipe.ingredients.map(i=>({...i,quantity:i.quantity??"",unit:i.unit??""})),instructions:[...editorRecipe.instructions],dietaryTags:[...editorRecipe.dietaryTags]} : createInitialForm());
        setFieldErrors({});setFormError("");setSaveError("");
      } },[view,editorRecipe]);
      function updateForm(key,value) { setForm(f=>({...f,[key]:value})); }
      function updateFormIngredient(id,key,value) { setForm(f=>({...f,ingredients:f.ingredients.map(i=>i.id===id?{...i,[key]:value}:i)})); }
      function updateInstruction(index,value) { setForm(f=>({...f,instructions:f.instructions.map((x,i)=>i===index?value:x)})); }
      function toggleFormTag(tag) { setForm(f=>({...f,dietaryTags:f.dietaryTags.includes(tag)?f.dietaryTags.filter(t=>t!==tag):[...f.dietaryTags,tag]})); }
      function saveCustom(event) {
        event.preventDefault();
        const errors={};
        if(!form.name.trim()) errors.name="Please add a recipe name.";
        if(!form.ingredients.some(i=>i.name.trim())) errors.ingredients="Add at least one ingredient.";
        setFieldErrors(errors);
        if(Object.keys(errors).length) { setFormError("Please fix the highlighted fields before saving.");return; }
        try {
          const recipe={id:editorRecipe?.id||uid(),name:form.name.trim(),description:form.description.trim(),ingredients:form.ingredients.filter(i=>i.name.trim()).map(i=>({id:i.id||uid(),name:i.name.trim(),quantity:i.quantity===""||i.quantity==null?null:Number(i.quantity),unit:i.unit.trim()||null,isOptional:!!i.isOptional})),instructions:form.instructions.map(x=>x.trim()).filter(Boolean),servings:Math.max(1,Number(form.servings)||1),prepMinutes:Math.max(0,Number(form.prepMinutes)||0),cookMinutes:Math.max(0,Number(form.cookMinutes)||0),difficulty:form.difficulty,dietaryTags:form.dietaryTags,isCustom:true,createdAt:editorRecipe?.createdAt||new Date().toISOString()};
          setCustom(prev=>editorRecipe?prev.map(r=>r.id===recipe.id?recipe:r):[...prev,recipe]);
          setView(editorRecipe?"detail":"recommendations");setDetailId(editorRecipe?recipe.id:null);if(editorRecipe)setServings(recipe.servings);
          flash(editorRecipe?"Recipe updated.":"Your recipe has been added.");
        } catch { setSaveError("We couldn't save this recipe. Your form is still here—please try again."); }
      }
      function confirmDelete() {
        if(!deleteTarget) return;
        setCustom(prev=>prev.filter(r=>r.id!==deleteTarget.id));
        setSaved(prev=>prev.filter(s=>s.recipeId!==deleteTarget.id));
        if(detailId===deleteTarget.id) { setDetailId(null);setView("recommendations"); }
        flash("Recipe deleted.");setDeleteTarget(null);
      }

      const detailRecipe=recipeById(detailId);
      const detailMatch=detailRecipe?matchFor(detailRecipe):null;
      const isSaved=id=>saved.some(s=>s.recipeId===id);
      const setScreen=screen=>{setView(screen);setQuery("");};

      function Header() {
        return <header className="topbar sticky top-0 z-20">
          <div className="container flex min-h-[68px] items-center justify-between gap-3">
            <button className="flex items-center gap-2.5 border-0 bg-transparent p-0 text-left" onClick={()=>setScreen("recommendations")} aria-label="Gather and Graze home">
              <span className="brand-mark" aria-hidden="true">✳</span>
              <span><span className="block text-[16px] font-extrabold tracking-tight text-[#244632]">Gather <span className="text-[#c66e4c]">&amp;</span> Graze</span><span className="hidden text-[10px] font-semibold tracking-[.16em] text-[#788378] sm:block">GOOD FOOD, MADE FROM WHAT YOU HAVE</span></span>
            </button>
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              <button className={"nav-link "+(view==="recommendations"||view==="detail"&& !detailFromSaved.current?"active":"")} onClick={()=>setScreen("recommendations")}>Discover</button>
              <button className={"nav-link "+(view==="saved"||view==="detail"&&detailFromSaved.current?"active":"")} onClick={()=>setScreen("saved")}>Saved <span className="ml-1 text-xs opacity-70">{saved.length}</span></button>
              <button className="ml-1 grid h-9 w-9 place-items-center rounded-xl border-0 bg-[#245b43] text-xl font-medium text-white hover:bg-[#194631]" onClick={startNew} aria-label="Create a recipe">+</button>
            </nav>
          </div>
        </header>;
      }

      function Card({recipe,result,fromSaved=false}) {
        const tags=recipe.dietaryTags||[];
        return <article role="button" tabIndex="0" aria-label={`Open ${recipe.name} recipe`} className="recipe-card card flex h-full flex-col p-5" onClick={()=>showDetail(recipe.id,fromSaved)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showDetail(recipe.id,fromSaved);}}}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {result && <span className="status status-good mb-2 inline-flex">{result.matchPercentage}% match</span>}
              <h3 className="text-lg font-extrabold leading-snug tracking-tight text-[#263a2d]">{recipe.name}</h3>
            </div>
            <button className={"heart shrink-0 "+(isSaved(recipe.id)?"saved":"")} onClick={e=>{e.stopPropagation();toggleSave(recipe.id);}} aria-label={isSaved(recipe.id)?"Unsave "+recipe.name:"Save "+recipe.name} aria-pressed={isSaved(recipe.id)}>{isSaved(recipe.id)?"♥":"♡"}</button>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#68756b]">{recipe.description||"A homemade favorite, ready for your table."}</p>
          {result && <div className="mt-4 rounded-xl bg-[#f4f6ef] px-3 py-2.5 text-sm">
            <div className="font-bold text-[#365640]">{result.matchedIngredientCount} of {result.requiredIngredientCount} ingredients on hand</div>
            {result.missingIngredients.length>0?<p className="mt-1 text-xs leading-relaxed text-[#69746a]"><span className="font-semibold">Still needed:</span> {result.missingIngredients.join(", ")}</p>:<p className="mt-1 text-xs font-semibold text-[#47734e]">You have everything you need!</p>}
          </div>}
          {!result && <p className="mt-3 text-xs text-[#6a776d]">Your saved kitchen inspiration</p>}
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-[#657168]"><span>◷ {recipeTotal(recipe)} min</span><span>·</span><span>{recipe.difficulty}</span>{recipe.isCustom&&<span className="tag">My recipe</span>}</div>
            {tags.length>0&&<div className="mt-3 flex flex-wrap gap-1.5">{tags.map(t=><span key={t} className="tag">{t}</span>)}</div>}
            {recipe.isCustom&&<div className="mt-3 flex gap-3 border-t border-[#edf0e8] pt-2"><button className="text-button text-xs" onClick={e=>{e.stopPropagation();startEdit(recipe);}}>Edit recipe</button><button className="text-button text-xs text-[#a34d37]" onClick={e=>{e.stopPropagation();setDeleteTarget(recipe);}}>Delete</button></div>}
          </div>
        </article>;
      }

      function Skeletons() {
        return <div className="recipe-grid grid grid-cols-1 gap-4 sm:gap-5">{[1,2,3].map(n=><div className="card p-5" key={n}><div className="placeholder h-6 w-2/3 rounded-lg"></div><div className="placeholder mt-4 h-4 w-full rounded"></div><div className="placeholder mt-2 h-4 w-4/5 rounded"></div><div className="placeholder mt-5 h-16 rounded-xl"></div><div className="placeholder mt-5 h-4 w-1/2 rounded"></div></div>)}</div>;
      }
      function ErrorBox({message,retry}) {
        return <div className="card border-[#f0d8cb] bg-[#fffaf7] p-6 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#fff0e7] text-xl text-[#a65337]">!</div><p className="mt-3 font-bold text-[#533e34]">{message}</p><button className="secondary mt-4" onClick={retry}>Retry</button></div>;
      }

      function IngredientsPanel() {
        return <section className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div><p className="text-xs font-extrabold uppercase tracking-[.13em] text-[#c16b4c]">Start with your kitchen</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#253a2c] sm:text-[28px]">What have you got?</h1></div>
            {ingredients.length>0&&<button className="text-button text-sm" onClick={clearIngredients}>Clear all</button>}
          </div>
          <p className="mt-2 text-sm text-[#69756c]">Add ingredients and we’ll find something lovely to make.</p>
          <div className="mt-4 flex gap-2">
            <label className="sr-only" htmlFor="ingredient-input">Add an ingredient</label>
            <input ref={inputRef} id="ingredient-input" className="field min-w-0" value={input} placeholder="e.g. chickpeas, lemon, spinach" onChange={e=>setInput(e.target.value)} onKeyDown={e=>{
              if(e.key==="Enter"||e.key===","){e.preventDefault();addIngredient();}
              if(e.key==="Backspace"&&!input&&ingredients.length){e.preventDefault();removeIngredient(ingredients[ingredients.length-1].id);}
              if(e.key==="ArrowLeft"&&!input&&ingredients.length){e.preventDefault();chipRefs.current[ingredients.length-1]?.focus();}
            }} />
            <button className="primary shrink-0" onClick={()=>addIngredient()}>Add</button>
          </div>
          {ingredients.length>0&&<div className="mt-3 flex flex-wrap gap-2" aria-label="Your ingredients">{ingredients.map((item,index)=><span className="chip" key={item.id}><span>{item.name}</span><button ref={el=>chipRefs.current[index]=el} className="chip-remove" aria-label={`Remove ${item.name}`} onClick={()=>{removeIngredient(item.id);inputRef.current?.focus();}} onKeyDown={e=>{if(e.key==="Backspace"||e.key==="Delete"){e.preventDefault();removeIngredient(item.id);inputRef.current?.focus();} if(e.key==="ArrowRight"){e.preventDefault();if(index<ingredients.length-1)chipRefs.current[index+1]?.focus();else inputRef.current?.focus();} if(e.key==="ArrowLeft"&&index>0){e.preventDefault();chipRefs.current[index-1]?.focus();}}}>×</button></span>)}</div>}
          {!ingredients.length&&<div className="mt-4 text-xs text-[#7c857a]">Try: <button className="text-button text-xs" onClick={()=>addIngredient("eggs")}>eggs</button>, <button className="text-button text-xs" onClick={()=>addIngredient("tomatoes")}>tomatoes</button>, <button className="text-button text-xs" onClick={()=>addIngredient("garlic")}>garlic</button> or <button className="text-button text-xs" onClick={()=>addIngredient("spinach")}>spinach</button></div>}
        </section>;
      }

      function Filters() {
        return <section className="card mt-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-extrabold text-[#324536]">Fine-tune your finds</h2><p className="mt-0.5 text-xs text-[#788278]">Your results update as you choose.</p></div><button className="text-button text-xs" onClick={clearFilters}>Reset filters</button></div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label className="label" htmlFor="max-time">Maximum total time</label><select id="max-time" className="field py-[10px]" value={preferences.maxTotalMinutes??""} onChange={e=>updatePref("maxTotalMinutes",e.target.value?Number(e.target.value):null)}><option value="">Any amount of time</option><option value="20">20 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></div>
            <div><label className="label" htmlFor="sort-results">Sort by</label><select id="sort-results" className="field py-[10px]" value={preferences.sortBy} onChange={e=>updatePref("sortBy",e.target.value)}><option>Best match</option><option>Shortest time</option><option>Fewest missing</option></select></div>
          </div>
          <div className="mt-4">
            <p className="label">Dietary preferences</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">{TAGS.map(tag=><label key={tag} className="flex cursor-pointer items-center gap-2 text-sm text-[#536157]"><input type="checkbox" className="accent-[#245b43]" checked={preferences.dietaryTags.includes(tag)} onChange={e=>updatePref("dietaryTags",e.target.checked?[...preferences.dietaryTags,tag]:preferences.dietaryTags.filter(t=>t!==tag))}/>{tag}</label>)}</div>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#46594a]"><input type="checkbox" className="accent-[#245b43]" checked={!!preferences.onlyCookableRecipes} onChange={e=>updatePref("onlyCookableRecipes",e.target.checked)}/>Only show recipes I can make now</label>
        </section>;
      }

      function Recommendations() {
        return <main className="container pb-12 pt-6 sm:pt-8">
          {IngredientsPanel()}
          {Filters()}
          <section className="mt-7" aria-live="polite">
            {ingredients.length===0 ? <div className="card mt-4 px-6 py-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e8eee5] text-2xl">🥕</div><h2 className="mt-4 text-xl font-extrabold text-[#304434]">A little inspiration starts here</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6c786e]">Add a few ingredients you have on hand to discover recipes made for your kitchen.</p><p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#879186]">A few ideas: eggs · tomatoes · garlic · spinach</p></div> :
              pageState==="loading" ? <><div className="mb-4 h-6 w-48 placeholder rounded"></div>{Skeletons()}</> :
              pageState==="error" ? <ErrorBox message="We couldn’t load recommendations right now." retry={()=>{setPageState("loading");setTimeout(()=>setPageState("ready"),300);}}/> :
              <><div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#c16b4c]">Your recipe matches</p><h2 className="mt-1 text-xl font-extrabold text-[#2b3e30]">{recommendationResults.length} {recommendationResults.length===1?"recipe":"recipes"} to explore</h2></div><span className="text-xs text-[#79837a]">Ranked for your ingredients</span></div>
              {recommendationResults.length ? <div className="recipe-grid grid grid-cols-1 gap-4 sm:gap-5">{recommendationResults.map(r=><Card key={r.recipe.id} recipe={r.recipe} result={r}/>)}</div> :
                <div className="card px-6 py-9 text-center"><div className="text-3xl">🍲</div><h3 className="mt-3 text-lg font-extrabold text-[#344737]">No recipes match just yet</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#6c786e]">Nothing in our collection matches these ingredients and filters. Try changing your ingredients, or clear the filters to broaden your search.</p><div className="mt-4 flex flex-wrap justify-center gap-2"><button className="secondary" onClick={()=>inputRef.current?.focus()}>Change ingredients</button><button className="primary" onClick={clearFilters}>Clear filters</button></div></div>}
              </>}
          </section>
        </main>;
      }

      function SavedScreen() {
        return <main className="container pb-12 pt-7 sm:pt-9">
          <div className="mb-5"><p className="text-xs font-extrabold uppercase tracking-[.13em] text-[#c16b4c]">Your personal cookbook</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#263a2d]">Saved recipes</h1><p className="mt-2 text-sm text-[#6c786e]">{saved.length} {saved.length===1?"recipe":"recipes"} tucked away for later.</p></div>
          {pageState==="loading"?<Skeletons/>:pageState==="error"?<ErrorBox message="We couldn’t load your saved recipes." retry={()=>{setPageState("loading");setTimeout(()=>setPageState("ready"),300);}}/>:
          saved.length===0?<div className="card px-6 py-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e8eee5] text-2xl">♡</div><h2 className="mt-4 text-xl font-extrabold text-[#304434]">Your saved list is ready</h2><p className="mt-2 text-sm text-[#6c786e]">Tap the heart on any recipe to keep it close for another day.</p><button className="primary mt-5" onClick={()=>setScreen("recommendations")}>Explore recipes</button></div>:
          <>
            <div className="card mb-5 grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1fr_220px] sm:items-end">
              <div><label className="label" htmlFor="saved-search">Search saved recipes</label><input id="saved-search" className="field" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by recipe name or description"/></div>
              <div><label className="label" htmlFor="saved-sort">Sort saved recipes</label><select id="saved-sort" className="field" value={preferences.savedSort||"Recipe name"} onChange={e=>updatePref("savedSort",e.target.value)}><option>Recipe name</option><option>Prep time</option></select></div>
            </div>
            {pageState==="loading"?<Skeletons/>:savedResults.length?<div className="recipe-grid grid grid-cols-1 gap-4 sm:gap-5">{savedResults.map(r=><Card key={r.id} recipe={r} fromSaved/>)}</div>:
              <div className="card px-6 py-9 text-center"><h2 className="text-lg font-extrabold text-[#344737]">No saved recipes found</h2><p className="mt-2 text-sm text-[#6c786e]">Try another search to find what you’re looking for.</p><button className="text-button mt-2" onClick={()=>setQuery("")}>Clear search</button></div>}
          </>}
        </main>;
      }

      function formatQuantity(value) {
        if(value===null||value===undefined||value==="") return "";
        const n=Number(value);
        if(!Number.isFinite(n)) return "";
        const rounded=Math.round(n*100)/100;
        const whole=Math.floor(rounded), frac=rounded-whole;
        const fractions=[[0.25,"¼"],[0.33,"⅓"],[0.5,"½"],[0.67,"⅔"],[0.75,"¾"]];
        const match=fractions.find(x=>Math.abs(x[0]-frac)<0.04);
        if(match) return whole?`${whole} ${match[1]}`:match[1];
        return String(rounded);
      }
      function Detail() {
        if(pageState==="loading") return <main className="container py-8"><button className="text-button mb-5" onClick={returnToResults}>← Back to recipes</button><div className="card p-6"><div className="placeholder h-8 w-2/3 rounded"></div><div className="placeholder mt-4 h-4 w-full rounded"></div><div className="placeholder mt-8 h-40 rounded-xl"></div></div></main>;
        if(pageState==="error"||!detailRecipe) return <main className="container py-8"><ErrorBox message="This recipe isn’t available right now." retry={returnToResults}/></main>;
        const r=detailRecipe, ratio=(Number(servings)||r.servings)/r.servings;
        return <main className="container pb-12 pt-6 sm:pt-8">
          <button className="text-button mb-4 flex items-center gap-1" onClick={returnToResults}>← <span>Back to {detailFromSaved.current?"saved recipes":"recipes"}</span></button>
          <div className="mb-5">
            <div className="flex flex-wrap items-start justify-between gap-3"><div className="max-w-3xl"><div className="flex flex-wrap gap-2">{r.isCustom&&<span className="tag">My recipe</span>}{r.dietaryTags.map(t=><span className="tag" key={t}>{t}</span>)}</div><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#263a2d] sm:text-4xl">{r.name}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#657268]">{r.description||"A delicious homemade recipe to share."}</p></div><button className={"heart h-11 w-11 "+(isSaved(r.id)?"saved":"")} onClick={()=>toggleSave(r.id)} aria-label={isSaved(r.id)?"Unsave recipe":"Save recipe"} aria-pressed={isSaved(r.id)}>{isSaved(r.id)?"♥":"♡"}</button></div>
            {detailMatch&&ingredients.length>0&&<div className="mt-4 flex flex-wrap items-center gap-2"><span className={"status "+(detailMatch.isCookable?"status-good":"status-warn")}>{detailMatch.matchPercentage}% ingredient match</span><span className="text-sm text-[#68756b]">{detailMatch.matchedIngredientCount} of {detailMatch.requiredIngredientCount} ingredients on hand</span></div>}
          </div>
          <div className="detail-layout">
            <div className="card p-5 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.13em] text-[#c16b4c]">Gather your ingredients</p><h2 className="mt-1 text-xl font-extrabold text-[#2b3e30]">Ingredients</h2></div>
                <div className="flex items-center gap-2"><label htmlFor="servings" className="text-sm font-semibold text-[#617065]">Serves</label><input id="servings" type="number" min="1" max="50" className="field w-[74px] py-2 text-center" value={servings} onChange={e=>setServings(Math.min(50,Math.max(1,Number(e.target.value)||1)))}/><button className="text-button text-xs" onClick={()=>setServings(r.servings)}>Reset</button></div></div>
              <ul className="mt-5 space-y-3">{r.ingredients.map(i=><li key={i.id} className="flex items-start gap-3 border-b border-[#eef0e9] pb-3 text-sm last:border-0"><span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-[#b9c8b8]"></span><span className="flex-1 text-[#3e4d41]">{formatQuantity(i.quantity==null?null:Number(i.quantity)*ratio)}{i.unit?` ${i.unit}`:""}{i.quantity!=null||i.unit?" ":""}{i.name}{i.isOptional&&<span className="ml-1 text-xs text-[#899287]">(optional)</span>}</span>{detailMatch&&!i.isOptional&&detailMatch.missingIngredients.includes(i.name)&&<span className="tag bg-[#fff0e6] text-[#9b4f32]">Needed</span>}</li>)}</ul>
              {detailMatch&&detailMatch.missingIngredients.length>0&&<div className="mt-4 rounded-xl bg-[#fff5ee] p-3 text-sm text-[#794d39]"><strong>Still needed:</strong> {detailMatch.missingIngredients.join(", ")}</div>}
              <hr className="divider my-7"/>
              <p className="text-xs font-extrabold uppercase tracking-[.13em] text-[#c16b4c]">Let’s get cooking</p><h2 className="mt-1 text-xl font-extrabold text-[#2b3e30]">Instructions</h2>
              {r.instructions.length?<ol className="instruction-list mt-5 space-y-5">{r.instructions.map((step,i)=><li className="instruction text-sm leading-relaxed text-[#536056]" key={i}>{step}</li>)}</ol>:<p className="mt-4 text-sm text-[#707b71]">No instructions have been added yet.</p>}
            </div>
            <aside className="mt-4 space-y-4 md:mt-0">
              <div className="card p-5"><h2 className="font-extrabold text-[#304434]">At a glance</h2><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#f4f6ef] p-3"><p className="text-xs text-[#788278]">Prep</p><p className="mt-1 text-lg font-extrabold text-[#355640]">{r.prepMinutes} <span className="text-xs font-semibold">min</span></p></div><div className="rounded-xl bg-[#f4f6ef] p-3"><p className="text-xs text-[#788278]">Cook</p><p className="mt-1 text-lg font-extrabold text-[#355640]">{r.cookMinutes} <span className="text-xs font-semibold">min</span></p></div></div><div className="mt-3 flex justify-between border-t border-[#edf0e8] pt-3 text-sm"><span className="text-[#69756b]">Total time</span><strong>{recipeTotal(r)} min</strong></div><div className="mt-3 flex justify-between text-sm"><span className="text-[#69756b]">Difficulty</span><strong>{r.difficulty}</strong></div></div>
              <div className="card p-5"><h2 className="font-extrabold text-[#304434]">Make it yours</h2><p className="mt-2 text-sm leading-relaxed text-[#6a766c]">Adjust the servings above and ingredient quantities will scale to match.</p>{r.isCustom&&<div className="mt-4 flex gap-3 border-t border-[#edf0e8] pt-3"><button className="text-button text-sm" onClick={()=>startEdit(r)}>Edit recipe</button><button className="text-button text-sm text-[#a34d37]" onClick={()=>setDeleteTarget(r)}>Delete</button></div>}</div>
            </aside>
          </div>
        </main>;
      }

      function Editor() {
        return <main className="container max-w-4xl pb-12 pt-6 sm:pt-8">
          <button className="text-button mb-4" onClick={()=>setView(editorRecipe?"detail":"recommendations")}>← Cancel and go back</button>
          <div className="mb-5"><p className="text-xs font-extrabold uppercase tracking-[.13em] text-[#c16b4c]">Your kitchen, your cookbook</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#263a2d]">{editorRecipe?"Edit your recipe":"Create a recipe"}</h1><p className="mt-2 text-sm text-[#6c786e]">Save a favorite so it’s easy to find next time.</p></div>
          <form className="card p-5 sm:p-7" onSubmit={saveCustom} noValidate>
            {formError&&<div className="mb-5 rounded-xl border border-[#f0d3c5] bg-[#fff5ef] p-3 text-sm font-semibold text-[#8d4a35]" role="alert">{formError}</div>}
            {saveError&&<div className="mb-5 rounded-xl border border-[#f0d3c5] bg-[#fff5ef] p-3 text-sm text-[#8d4a35]" role="alert">{saveError}</div>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="label" htmlFor="recipe-name">Recipe name <span className="text-[#b84e36]">*</span></label><input id="recipe-name" className="field" value={form.name} onChange={e=>updateForm("name",e.target.value)} placeholder="e.g. Sunday tomato soup" aria-invalid={!!fieldErrors.name}/>{fieldErrors.name&&<p className="mt-1 text-xs font-semibold text-[#a54732]">{fieldErrors.name}</p>}</div>
              <div className="sm:col-span-2"><label className="label" htmlFor="recipe-description">Description</label><textarea id="recipe-description" className="field min-h-[86px] resize-y" value={form.description} onChange={e=>updateForm("description",e.target.value)} placeholder="What makes this recipe special?"/></div>
              <div><label className="label" htmlFor="prep-time">Prep time (minutes)</label><input id="prep-time" className="field" type="number" min="0" value={form.prepMinutes} onChange={e=>updateForm("prepMinutes",e.target.value)} /></div>
              <div><label className="label" htmlFor="cook-time">Cook time (minutes)</label><input id="cook-time" className="field" type="number" min="0" value={form.cookMinutes} onChange={e=>updateForm("cookMinutes",e.target.value)}/></div>
              <div><label className="label" htmlFor="serving-count">Original servings</label><input id="serving-count" className="field" type="number" min="1" value={form.servings} onChange={e=>updateForm("servings",e.target.value)}/></div>
              <div><label className="label" htmlFor="difficulty">Difficulty</label><select id="difficulty" className="field" value={form.difficulty} onChange={e=>updateForm("difficulty",e.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
            </div>
            <div className="mt-6">
              <div className="flex flex-wrap items-end justify-between gap-2"><div><label className="label mb-0">Ingredients <span className="text-[#b84e36]">*</span></label><p className="mt-1 text-xs text-[#788278]">Add an ingredient name and, if you like, a quantity and unit.</p></div><button type="button" className="secondary text-sm" onClick={()=>updateForm("ingredients",[...form.ingredients,{id:uid(),name:"",quantity:"",unit:"",isOptional:false}])}>+ Add ingredient</button></div>
              {fieldErrors.ingredients&&<p className="mt-2 text-xs font-semibold text-[#a54732]">{fieldErrors.ingredients}</p>}
              <div className="mt-3 space-y-2">{form.ingredients.map((item,index)=><div key={item.id} className="grid grid-cols-[minmax(0,1fr)_76px_minmax(0,100px)_36px] items-center gap-2 rounded-xl bg-[#f6f7f1] p-2">
                <label className="sr-only" htmlFor={`ing-name-${item.id}`}>Ingredient {index+1} name</label><input id={`ing-name-${item.id}`} className="field px-2.5 py-2 text-sm" value={item.name} onChange={e=>updateFormIngredient(item.id,"name",e.target.value)} placeholder="Ingredient"/>
                <label className="sr-only" htmlFor={`ing-qty-${item.id}`}>Quantity</label><input id={`ing-qty-${item.id}`} className="field px-2 py-2 text-sm" type="number" min="0" step="any" value={item.quantity} onChange={e=>updateFormIngredient(item.id,"quantity",e.target.value)} placeholder="Qty"/>
                <label className="sr-only" htmlFor={`ing-unit-${item.id}`}>Unit</label><input id={`ing-unit-${item.id}`} className="field px-2.5 py-2 text-sm" value={item.unit} onChange={e=>updateFormIngredient(item.id,"unit",e.target.value)} placeholder="Unit"/>
                <button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-[#e4e6dc] bg-white text-lg text-[#8b5748] hover:bg-[#fff0e8]" aria-label={`Remove ingredient ${index+1}`} onClick={()=>updateForm("ingredients",form.ingredients.filter(x=>x.id!==item.id))}>×</button>
                <label className="col-span-full flex items-center gap-2 px-1 pb-1 text-xs text-[#68756b]"><input type="checkbox" className="accent-[#245b43]" checked={!!item.isOptional} onChange={e=>updateFormIngredient(item.id,"isOptional",e.target.checked)}/>Optional ingredient</label>
              </div>)}</div>
            </div>
            <div className="mt-6"><div className="flex flex-wrap items-center justify-between gap-2"><div><label className="label mb-0">Instructions</label><p className="mt-1 text-xs text-[#788278]">Add the steps in the order you’d cook them.</p></div><button type="button" className="secondary text-sm" onClick={()=>updateForm("instructions",[...form.instructions,""])}>+ Add step</button></div>
              <div className="mt-3 space-y-2">{form.instructions.map((step,index)=><div className="flex gap-2" key={index}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8eee5] text-sm font-extrabold text-[#315740]">{index+1}</span><label className="sr-only" htmlFor={`step-${index}`}>Instruction step {index+1}</label><textarea id={`step-${index}`} className="field min-h-[42px] resize-y" value={step} onChange={e=>updateInstruction(index,e.target.value)} placeholder="Describe this step..."/><button type="button" className="h-10 w-9 shrink-0 rounded-lg border border-[#e4e6dc] bg-white text-lg text-[#8b5748]" aria-label={`Remove step ${index+1}`} onClick={()=>updateForm("instructions",form.instructions.filter((_,i)=>i!==index))}>×</button></div>)}</div>
            </div>
            <fieldset className="mt-6"><legend className="label">Dietary tags</legend><div className="flex flex-wrap gap-x-5 gap-y-2">{TAGS.map(tag=><label className="flex cursor-pointer items-center gap-2 text-sm text-[#536157]" key={tag}><input type="checkbox" className="accent-[#245b43]" checked={form.dietaryTags.includes(tag)} onChange={()=>toggleFormTag(tag)}/>{tag}</label>)}</div></fieldset>
            <div className="mt-7 flex flex-col-reverse gap-2 border-t border-[#edf0e8] pt-5 sm:flex-row sm:justify-end"><button type="button" className="secondary" onClick={()=>setView(editorRecipe?"detail":"recommendations")}>Cancel</button><button type="submit" className="primary">{editorRecipe?"Save changes":"Save recipe"}</button></div>
          </form>
        </main>;
      }

      return <div className="app-shell">{Header()}
        {view==="recommendations"&&Recommendations()}
        {view==="saved"&&SavedScreen()}
        {view==="detail"&&Detail()}
        {view==="editor"&&Editor()}
        {notice&&<div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-[#243d2d] px-4 py-3 text-sm font-semibold text-white shadow-xl" role="status">{notice}</div>}
        {deleteTarget&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setDeleteTarget(null);}}><div className="card w-full max-w-md p-6" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-desc"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff0e8] text-xl text-[#a34d37]">!</div><h2 id="delete-title" className="mt-4 text-xl font-extrabold text-[#293d30]">Delete this recipe?</h2><p id="delete-desc" className="mt-2 text-sm leading-relaxed text-[#657268]"><strong>{deleteTarget.name}</strong> will be permanently removed from your personal collection and saved recipes. This can’t be undone.</p><div className="mt-6 flex justify-end gap-2"><button className="secondary" onClick={()=>setDeleteTarget(null)}>Cancel</button><button className="rounded-xl border border-[#a34d37] bg-[#a34d37] px-4 py-2.5 font-bold text-white hover:bg-[#843c2c]" onClick={confirmDelete}>Delete recipe</button></div></div></div>}
        <footer className="border-t border-[#e5e7de] py-5 text-center text-xs text-[#899187]">A little more joy from the ingredients you already have. <span className="text-[#c16b4c]">✳</span></footer>
      </div>;
    }

export default App;
