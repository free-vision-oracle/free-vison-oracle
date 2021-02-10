document.querySelector("#noscript").style.display = "none";
document.querySelector("#oracle").style.display = "grid";

(
    () => {
        /* 
            this time around, vanilla and clipboard. next time progressive web app?
        */
       // here's the state
       const decks = new Map();
       const spreads = new Map();
       const results = [];
       
       // here are some constants
       decks.set("free vision", ['?', 'activity partners', 'actual poverty', 'andro energy', 'angels', 'anger', 'anomalous readings', 'authenticity', 'beginning', 'new', 'boundaries', 'care taking', 'change', 'clarity', 'commitment', 'continue', 'craft', 'dada', 'death', 'delusion', 'discretion', 'end', 'entitlement', 'equanimity', 'family', 'femme energy', 'focus', 'foolishness', 'force', 'friends', 'highly probable', 'honesty', 'improbable', 'intoxication', 'intuition', 'joy', 'karma', 'literally fuck off', 'logic', 'love', 'lovers', 'masc energy', 'middle', 'music', 'neo', 'paradox', 'patriarchy', 'perceived lack', 'prosperity', 'restraint', 'romance', 'sadness', 'scope', 'self-care', 'sex', 'sobriety', 'start', 'stop', 'strangers', 'the matrix', 'trans energy', 'truth', 'volatility', 'wealth', 'wholesomeness']);
       decks.set("rider major", ["the fool","the magician", "the high priestess", "the empress", "the emperor", "the hierophant", "the lovers", "the chariot", "strength", "the hermit", "wheel of fortune","justice","the hanged man","death", "temperance", "the devil", "the tower", "the star", "the moon", "the sun", "judgement", "the world"]);
       spreads.set("thinking feeling doing", ["thinking", "feeling", "doing"]);
       spreads.set("ancient cross", ["present","immediate influence","goal or destiny","distant past","recent past","future influence","the questioner","environmental factors","inner emotions","final result"]);
       spreads.set("kraans cross", ["subject", "opposing", "core issue", "past", "goal", "future", "you", "externals", "hope/fear", "ultimately"]);
       spreads.set("kinzy cross", ["intention", "contrast", "reality", "previously", "presently", "immediately", "your energy", "ambient energy", "consider", "and maybe"]);
       
        // here we grab the user's stuff from localstorage
        decks.set("custom", window.localStorage.getItem("deck") ? JSON.parse(window.localStorage.getItem("deck")) : []);
        spreads.set("custom", window.localStorage.getItem("spread") ? JSON.parse(window.localStorage.getItem("spread")) : []);
       
       
        (
           () => {
               // populate the deck selector
                let option;
                for (let deck of decks.keys()){
                    option = document.createElement("option");
                    option.value = option.innerText = deck;
                    document.querySelector("#deck-select").appendChild(option);
                }
                // populate the spread selector
                for (let spread of spreads.keys()){
                    option = document.createElement("option");
                    option.value = option.innerText = spread;
                    document.querySelector("#spread-select").appendChild(option);
                }
            }
       )();
        
       // deck selector
       document.querySelector("#deck-select").addEventListener("change", e => {
            if (e.target.value === "custom") {
                document.querySelector("#cards-input").setAttribute("disabled", "false");
            } else {
                document.querySelector("#cards-input").setAttribute("disabled", "true");
            }
            document.querySelector("#cards-input").value = decks.get(e.target.value).join(",\n");
       });
       document.querySelector("#deck-select").dispatchEvent(new Event("change"));
        
       // spread selector
        document.querySelector("#spread-select").addEventListener("change", e => {
            if (e.target.value === "custom") {
                document.querySelector("#positions-input").setAttribute("disabled", "false");
            } else {
                document.querySelector("#positions-input").setAttribute("disabled", "true");
            }
            document.querySelector("#positions-input").value = spreads.get(document.querySelector("#spread-select").value).join(",\n");
        });
        document.querySelector("#spread-select").dispatchEvent(new Event("change"));

        document.querySelector("#divine").addEventListener("click", e => {
            // first we generate our thingy
            const positions = spreads.get(document.querySelector("#spread-select").value);
            const cards = Object.assign([], decks.get(document.querySelector("#deck-select").value));
            const query = document.querySelector("#query-input").value;
            const spread = {query:query, spread:[]};
            const html = [];
            const element = document.createElement("div");
            element.className = "result";
            element.setAttribute("id", `spread-${results.length}`)
            element.addEventListener("click", shareSpread)
            for (let p of positions){
                spread.spread.push([p, cards.splice(Math.floor(Math.random()*cards.length),1)[0]]);
            }
            results.push(spread);
            html.push(`<div class="spread-query">${query}</div>`);
            for (let [position, card] of spread.spread){
                html.push(`<span class="spread-position">•${position}:</span> <span class="spread-card">${card}</span>`);
            }
            element.innerHTML = html.join("<br>");
            document.querySelector("#results-area").appendChild(element);
        })

        const shareSpread  = (e) => {
            const spread = results[Number(e.target.id.split("-")[1])];
            console.table(spread);
        }
})();