const WORDS = [
    { w: "JAVASCRIPT", c: "Language", clue: "The scripting language that runs natively in every browser on earth" },
    { w: "TYPESCRIPT", c: "Language", clue: "Microsoft's statically-typed superset of JavaScript" },
    { w: "PYTHON", c: "Language", clue: "Named after Monty Python — not the snake" },
    { w: "RUST", c: "Language", clue: "Mozilla-born systems language famous for memory safety without a GC" },
    { w: "KOTLIN", c: "Language", clue: "JetBrains' modern JVM language, now Google's preferred Android language" },
    { w: "GOLANG", c: "Language", clue: "Compiled, concurrent language from Google with a friendly gopher mascot" },
    { w: "SWIFT", c: "Language", clue: "Apple's language that replaced Objective-C for iOS development" },
    { w: "ELIXIR", c: "Language", clue: "Functional language on the Erlang VM, beloved for real-time distributed apps" },
    { w: "WEBASSEMBLY", c: "Language", clue: "Binary instruction format that lets C, Rust, and more run in the browser" },
    { w: "REACT", c: "Framework", clue: "Facebook's component-based UI library using a virtual DOM" },
    { w: "NEXTJS", c: "Framework", clue: "Vercel's React meta-framework with file-based routing and built-in SSR" },
    { w: "SVELTE", c: "Framework", clue: "Compiler-based frontend framework — no virtual DOM, ships to vanilla JS" },
    { w: "FASTAPI", c: "Framework", clue: "Python web framework that auto-generates OpenAPI docs from type hints" },
    { w: "KUBERNETES", c: "Platform", clue: "Greek for 'helmsman' — the dominant container orchestration system" },
    { w: "TERRAFORM", c: "DevOps", clue: "HashiCorp's infrastructure-as-code tool using a declarative HCL syntax" },
    { w: "GRAPHQL", c: "API", clue: "Facebook's query language — clients request exactly the shape of data they need" },
    { w: "RECURSION", c: "Concept", clue: "A function that solves a problem by calling itself — see: this clue" },
    { w: "POLYMORPHISM", c: "Concept", clue: "OOP principle: one interface, many different underlying implementations" },
    { w: "IDEMPOTENT", c: "Concept", clue: "An operation that yields the same result no matter how many times you run it" },
    { w: "DEADLOCK", c: "Concept", clue: "Two threads each waiting for the other to release a lock — forever" },
    { w: "MEMOIZATION", c: "Concept", clue: "Caching a function's return value keyed by its inputs to avoid repeat work" },
    { w: "MONOREPO", c: "Concept", clue: "Storing multiple distinct projects in a single version-controlled repository" },
    { w: "MICROSERVICES", c: "Architecture", clue: "Breaking a large app into small, independently deployable services" },
    { w: "SERVERLESS", c: "Architecture", clue: "Cloud model where you deploy functions, not servers" },
    { w: "WEBHOOK", c: "API", clue: "HTTP callback — one service pinging another when an event occurs" },
    { w: "MIDDLEWARE", c: "Concept", clue: "Code layer sitting between request and response in a web framework" },
    { w: "WEBSOCKET", c: "Protocol", clue: "Full-duplex communication channel over a single TCP connection" },
    { w: "OAUTH", c: "Protocol", clue: "Open standard for token-based access delegation — powers 'Login with Google'" },
    { w: "POSTGRESQL", c: "Database", clue: "Advanced open-source relational database, often called the most feature-rich RDBMS" },
    { w: "ELASTICSEARCH", c: "Database", clue: "Distributed search and analytics engine built on Apache Lucene" },
    { w: "REDIS", c: "Database", clue: "In-memory data structure store used as cache, message broker, and database" },
    { w: "DOCKER", c: "DevOps", clue: "Platform that packages apps and their dependencies into portable containers" },
    { w: "NGINX", c: "Server", clue: "High-performance web server and reverse proxy — pronounced 'engine-x'" },
    { w: "CLOUDFLARE", c: "Network", clue: "CDN and DDoS protection layer sitting in front of millions of websites" },
    { w: "TRANSFORMER", c: "AI/ML", clue: "The neural architecture behind GPT, BERT, and virtually all modern LLMs" },
    { w: "FINE TUNING", c: "AI/ML", clue: "Adapting a pre-trained model on a smaller, task-specific dataset" },
    { w: "TOKENIZATION", c: "AI/ML", clue: "Breaking raw text into sub-word units before feeding it to a language model" },
    { w: "EMBEDDINGS", c: "AI/ML", clue: "Dense vector representations of text used for semantic search and similarity" },
    { w: "BACKPROPAGATION", c: "AI/ML", clue: "Algorithm that propagates error gradients backward to train neural networks" },
    { w: "SQL INJECTION", c: "Security", clue: "Attack that manipulates a query by sneaking malicious SQL into user input" },
    { w: "ZERO DAY", c: "Security", clue: "A vulnerability exploited in the wild before the vendor even knows it exists" },
    { w: "JWT", c: "Security", clue: "Compact, URL-safe token format for transmitting claims between parties" },
    { w: "RATE LIMITING", c: "Security", clue: "Throttling how many requests a client can make in a given time window" },
    { w: "CONTINUOUS INTEGRATION", c: "DevOps", clue: "Practice of automatically building and testing code every time a developer pushes" },
    { w: "LOAD BALANCER", c: "Infrastructure", clue: "Distributes incoming traffic across multiple backend servers" },
    { w: "API GATEWAY", c: "Infrastructure", clue: "Single entry point that routes, authenticates, and rate-limits API calls" },
    { w: "RACE CONDITION", c: "Concept", clue: "Bug that occurs when two threads access shared state in an unexpected order" },
    { w: "DEPENDENCY INJECTION", c: "Concept", clue: "Design pattern where a class receives its dependencies rather than creating them" },
    { w: "BINARY SEARCH", c: "Algorithm", clue: "O(log n) search that halves the remaining range on each step" },
    { w: "HASH TABLE", c: "Data Structure", clue: "Maps keys to values using a hash function for O(1) average-case lookups" },
];

// ─── Game state ───────────────────────────────────────────────────────────────
const MAX_WRONG = 6;
const PARTS = ["p-head", "p-face", "p-body", "p-larm", "p-rarm", "p-lleg", "p-rleg"];

let word = "", clue = "", cat = "";
let guesses = [];
let revealedPositions = new Set();
let hintedPositions = new Set();
let wrongCount = 0;
let gameOver = false;
let hintsLeft = 2;
let wins = 0;
let losses = 0;

// ─── New game ─────────────────────────────────────────────────────────────────
function newGame() {
    const pick = WORDS[Math.floor(Math.random() * WORDS.length)];
    word = pick.w.toUpperCase();
    clue = pick.clue;
    cat = pick.c;

    guesses = [];
    revealedPositions = new Set();
    hintedPositions = new Set();
    wrongCount = 0;
    gameOver = false;
    hintsLeft = 2;

    document.getElementById("cat-label").textContent = cat;
    document.getElementById("clue-box").innerHTML = `<strong>CLUE</strong> — ${clue}`;

    const wordParts = word.trim().split(" ");
    document.getElementById("meta-len").textContent = word.replace(/ /g, "").length;

    const mw = document.getElementById("meta-words-wrap");
    if (wordParts.length > 1) {
        mw.style.display = "";
        document.getElementById("meta-words").textContent = wordParts.length;
    } else {
        mw.style.display = "none";
    }

    document.getElementById("meta-rem").textContent = MAX_WRONG;
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("submit-btn").disabled = false;
    document.getElementById("hint-btn").disabled = false;
    document.getElementById("hint-btn").textContent = `💡 Hint — reveal a letter (${hintsLeft} left, costs 1 life)`;
    document.getElementById("tally-rows").innerHTML = '<div class="tally-empty">No guesses yet — type your first attempt below</div>';
    document.getElementById("tally-count").textContent = "0 attempts";

    const sb = document.getElementById("status-box");
    sb.className = "status-box";
    sb.innerHTML = "";

    renderWord(false, false);
    renderPips();
    renderGallows(false);
}

// ─── Render word display ──────────────────────────────────────────────────────
function renderWord(won, dead) {
    const container = document.getElementById("word-display");
    container.innerHTML = "";

    word.split("").forEach((ch, i) => {
        if (ch === " ") {
            const sp = document.createElement("div");
            sp.className = "word-gap";
            container.appendChild(sp);
            return;
        }

        const cell = document.createElement("div");
        cell.className = "letter-cell";
        const isRevealed = revealedPositions.has(i);

        if (won || dead || isRevealed) {
            cell.textContent = ch;
            if (dead && !isRevealed) cell.classList.add("dead");
            else if (isRevealed && !won) cell.classList.add(hintedPositions.has(i) ? "hinted" : "revealed");
            else cell.classList.add("revealed");
        }

        container.appendChild(cell);
    });
}

// ─── Reveal matched positions from a guess ────────────────────────────────────
function addRevealedFromGuess(guess) {
    for (let i = 0; i < Math.min(guess.length, word.length); i++) {
        if (guess[i] === word[i]) revealedPositions.add(i);
    }
}

// ─── Tally marks ─────────────────────────────────────────────────────────────
function tallyMark(n) {
    if (n === 0) return "—";
    let s = "";
    const full = Math.floor(n / 5);
    const rem = n % 5;
    for (let i = 0; i < full; i++) s += "||||̶ ";
    if (rem > 0) s += "|".repeat(rem);
    return s.trim();
}

// ─── Add entry to attempt log ─────────────────────────────────────────────────
function addTallyEntry(guess, isCorrect) {
    const rows = document.getElementById("tally-rows");
    rows.querySelectorAll(".tally-empty").forEach(e => e.remove());

    const n = guesses.length;
    const entry = document.createElement("div");
    entry.className = "tally-entry";
    entry.innerHTML = `
    <span class="tally-num">${n}</span>
    <span class="tally-word ${isCorrect ? "correct-g" : "wrong-g"}">${guess}</span>
    <span class="tally-marks">${tallyMark(n)}</span>
    <span class="tally-icon">${isCorrect ? "✓" : "✗"}</span>
  `;
    rows.appendChild(entry);
    rows.scrollTop = rows.scrollHeight;
    document.getElementById("tally-count").textContent = `${n} attempt${n !== 1 ? "s" : ""}`;
}

// ─── Submit a guess ───────────────────────────────────────────────────────────
function submitGuess() {
    if (gameOver) return;
    const input = document.getElementById("guess-input");
    const raw = input.value.trim().toUpperCase();

    if (!raw) { shakeInput(); return; }
    if (guesses.includes(raw)) { shakeInput(); input.value = ""; return; }

    guesses.push(raw);
    const correct = raw === word;
    addTallyEntry(raw, correct);
    input.value = "";

    if (correct) {
        word.split("").forEach((_, i) => revealedPositions.add(i));
        renderWord(true, false);
        gameOver = true;
        wins++;
        document.getElementById("s-wins").textContent = wins;
        const sb = document.getElementById("status-box");
        sb.className = "status-box won visible";
        sb.innerHTML = `ACCESS GRANTED — Correct!<small>Solved in ${guesses.length} attempt${guesses.length !== 1 ? "s" : ""}</small>`;
        lockInput();
    } else {
        wrongCount++;
        addRevealedFromGuess(raw);
        renderWord(false, false);
        renderPips();
        if (wrongCount >= MAX_WRONG) endGame();
    }
}

// ─── Hint: reveal a random hidden letter ─────────────────────────────────────
function useHint() {
    if (gameOver || hintsLeft <= 0) return;

    const hidden = [];
    word.split("").forEach((ch, i) => {
        if (ch !== " " && !revealedPositions.has(i)) hidden.push(i);
    });
    if (!hidden.length) return;

    const pick = hidden[Math.floor(Math.random() * hidden.length)];
    revealedPositions.add(pick);
    hintedPositions.add(pick);
    wrongCount++;
    hintsLeft--;

    renderWord(false, false);
    renderPips();
    document.getElementById("hint-btn").textContent = `💡 Hint — reveal a letter (${hintsLeft} left, costs 1 life)`;
    if (hintsLeft <= 0) document.getElementById("hint-btn").disabled = true;
    if (wrongCount >= MAX_WRONG) endGame();
}

// ─── End game (loss) ──────────────────────────────────────────────────────────
function endGame() {
    gameOver = true;
    losses++;
    document.getElementById("s-losses").textContent = losses;
    renderWord(false, true);
    renderGallows(true);
    const sb = document.getElementById("status-box");
    sb.className = "status-box lost visible";
    sb.innerHTML = `SYSTEM FAILURE — The answer was <strong>${word}</strong><small>Out of lives</small>`;
    lockInput();
}

// ─── Gallows illustration ─────────────────────────────────────────────────────
function renderGallows(dead) {
    PARTS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle("visible", i < wrongCount);
    });

    const face = document.getElementById("p-face");
    const deadEl = document.getElementById("p-dead");

    if (dead) {
        face.classList.remove("visible");
        deadEl.classList.add("visible");
    } else {
        deadEl.classList.remove("visible");
    }
}

// ─── Lives pips ───────────────────────────────────────────────────────────────
function renderPips() {
    const pips = document.getElementById("pips");
    pips.innerHTML = "";
    for (let i = 0; i < MAX_WRONG; i++) {
        const p = document.createElement("div");
        p.className = "pip" + (i < wrongCount ? " lost" : "");
        pips.appendChild(p);
    }
    document.getElementById("meta-rem").textContent = Math.max(0, MAX_WRONG - wrongCount);
    renderGallows(false);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lockInput() {
    document.getElementById("guess-input").disabled = true;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("hint-btn").disabled = true;
}

function shakeInput() {
    const inp = document.getElementById("guess-input");
    inp.classList.remove("shake");
    void inp.offsetWidth; // force reflow to restart animation
    inp.classList.add("shake");
    setTimeout(() => inp.classList.remove("shake"), 400);
}

// ─── Event listeners ──────────────────────────────────────────────────────────
document.getElementById("guess-input").addEventListener("keydown", e => {
    if (e.key === "Enter") submitGuess();
});

// ─── Kick off ─────────────────────────────────────────────────────────────────
newGame();