// ── CLASS 11 ──────────────────────────────────────────────────────────────────
var class11Products = [
  {
    id: "class11-biology",
    name: "Biology Exam Cracker Pack",
    caption: "Everything you need to ace Class 11 Biology — chapter-wise notes, solved sample papers & top-rated guides. Built for students who don't want to waste time hunting resources.",
    price: 299, oldPrice: 599, hot: false, classLevel: 11
  },
  {
    id: "class11-math",
    name: "Mathematics Master Vault",
    caption: "From basics to board-level problems — complete chapter-wise practice, revision notes & sample papers. The only Math bundle you'll ever need for Class 11.",
    price: 199, oldPrice: 450, hot: false, classLevel: 11
  },
  {
    id: "class11-english",
    name: "English Score Booster Kit",
    caption: "Grammar drills, chapter summaries & writing guides — all in one place. Students who used this kit saw instant improvement in their written answers. 🔥 Bestseller.",
    price: 99, oldPrice: 300, hot: true, classLevel: 11
  },
  {
    id: "class11-hindi",
    name: "Hindi Topper's Companion",
    caption: "Crisp chapter-wise notes & detailed summaries of Aroh and Vitan — so you stop mugging and start understanding. Perfect for last-minute prep too.",
    price: 129, oldPrice: 200, hot: false, classLevel: 11
  },
  {
    id: "class11-physical-education",
    name: "Physical Education Quick Revision Notes",
    caption: "Compact, high-yield revision notes — cover the entire syllabus in record time. Ideal for students who want full marks with minimum effort.",
    price: 30, oldPrice: 299, hot: false, classLevel: 11
  },
  {
    id: "class11-chemistry",
    name: "Chemistry Concept Powerpack",
    caption: "In-depth chapter-wise material, quality guides & sample papers — get your concepts rock-solid before the exams. Covers theory and numericals both.",
    price: 199, oldPrice: 200, hot: false, classLevel: 11
  },
  {
    id: "class11-commerce-notes",
    name: "Commerce All-in-One Notes Bundle",
    caption: "Premium notes for Accountancy, Business Studies, Economics & Entrepreneurship — all subjects, one bundle. The smart choice for every Class 11 Commerce student.",
    price: 199, oldPrice: 500, hot: false, classLevel: 11
  },
  {
    id: "class11-physics",
    name: "Physics Complete Study Arsenal",
    caption: "Chapters 1–15 covered with guides, chapter-wise material & sample papers. Stop searching, start solving — everything you need is right here.",
    price: 199, oldPrice: 500, hot: false, classLevel: 11
  },
  {
    id: "class11-accountancy",
    name: "Accountancy Deep Dive Pack",
    caption: "Chapter-wise practice + UGC Commerce material + Management MCQ Book. More than just notes — a complete toolkit to score big in Accountancy.",
    price: 199, oldPrice: 340, hot: false, classLevel: 11
  },
  {
    id: "class11-microeconomics-graphs",
    name: "Microeconomics Graphs — Full Collection",
    caption: "Every important Microeconomics graph, clean and exam-ready. Master the visuals that examiners love — at a price that's a steal.",
    price: 20, oldPrice: 220, hot: false, classLevel: 11
  },
  {
    id: "class11-organic-chemistry-notes",
    name: "Organic Chemistry Handwritten Notes",
    caption: "Topper-style handwritten notes that simplify the toughest part of Class 11 Chemistry. Finally make sense of reactions, mechanisms & named reactions.",
    price: 40, oldPrice: 120, hot: false, classLevel: 11
  },
  {
    id: "class11-rd-sharma",
    name: "RD Sharma Class 11 Math — Full Scanned Copy",
    caption: "The gold standard of Class 11 Math, now at your fingertips. Complete scanned copy of RD Sharma XI — no more borrowing, no more searching.",
    price: 20, oldPrice: 150, hot: false, classLevel: 11
  },
  {
    id: "class11-physics-derivations",
    name: "Physics Derivations + 3 Free Concept Builders",
    caption: "All key derivations, important topics & 3 bonus worksheets (Integration, DDT & Motion Numericals). Walk into your exam knowing exactly what to write.",
    price: 150, oldPrice: 200, hot: false, classLevel: 11
  },
];

// ── CLASS 12 ──────────────────────────────────────────────────────────────────
var class12Products = [
  {
    id: "class12-biology",
    name: "Biology Board Exam Powerpack",
    caption: "Guides, revision notes, worksheets & sample papers — the complete arsenal for Class 12 Biology boards. Used by thousands of students to score 90+.",
    price: 299, oldPrice: 599, hot: false, classLevel: 12
  },
  {
    id: "class12-commerce-acc-bst",
    name: "Commerce Notes Bundle — Accounts + BST",
    caption: "Premium Accountancy Notes (Pack of 2) + BST Notes (Pack of 8) — the most value-packed Commerce bundle for Class 12 boards. No filler, all substance.",
    price: 199, oldPrice: 450, hot: false, classLevel: 12
  },
  {
    id: "class12-english",
    name: "English Board Score Maximiser",
    caption: "Flamingo, Vistas, writing formats, passages & sample papers — all covered. Students consistently report a 15–20 mark jump after using this kit. 🔥 Bestseller.",
    price: 99, oldPrice: 300, hot: true, classLevel: 12
  },
  {
    id: "class12-hindi",
    name: "Hindi Complete Prep Kit",
    caption: "Detailed summaries of Aroh & Vitan, Hindi grammar, sample papers & guides. Stop losing marks on Hindi — this kit makes every section scoring.",
    price: 129, oldPrice: 200, hot: false, classLevel: 12
  },
  {
    id: "class12-political-science",
    name: "Political Science Sample Papers — Premium Pack",
    caption: "Focused, exam-pattern sample papers curated for maximum marks. Spend 30 minutes a day on these and walk into your board exam with full confidence.",
    price: 30, oldPrice: 299, hot: false, classLevel: 12
  },
  {
    id: "class12-psychology",
    name: "Psychology Notes Booster Pack",
    caption: "High-yield, well-structured Psychology notes that cut through the clutter. Revise smarter, not harder — ideal for last-week board prep.",
    price: 120, oldPrice: 200, hot: false, classLevel: 12
  },
  {
    id: "class12-macroeconomics",
    name: "Macroeconomics Ultimate Bundle + Bonus",
    caption: "T.R. Jain & Dr. VK Ohria's full textbook + FREE Sandeep Garg scanned notes for Units 5–12. Two premium resources, one unbeatable price.",
    price: 199, oldPrice: 500, hot: false, classLevel: 12
  },
];

// ── JEE (COMPETITIVE) ─────────────────────────────────────────────────────────
var jeeProducts = [
  {
    id: "jee-savings-package",
    name: "JEE Starter Savings Pack",
    caption: "Arihant & Cengage textbooks, Chemistry references, top coaching materials & handwritten notes — all the essentials to kick off your JEE prep without breaking the bank.",
    price: 199, oldPrice: 300, hot: false, classLevel: "JEE"
  },
  {
    id: "jee-toppers-package",
    name: "JEE Topper's Vault — Resonance + Allen",
    caption: "The exact material used by JEE toppers — complete Resonance + Allen study packages in one place. If serious JEE prep had a shortcut, this is it. 🔥 Bestseller.",
    price: 700, oldPrice: 1500, hot: true, classLevel: "JEE"
  },
  {
    id: "jee-combo",
    name: "JEE Ultimate Combo — Everything Included",
    caption: "Arihant + Cengage textbooks, Chemistry resources, coaching materials, handwritten notes & full Resonance + Allen material — the most complete JEE bundle available. Best value.",
    price: 999, oldPrice: 1800, hot: false, classLevel: "JEE"
  },
];

// ── NEET (COMPETITIVE) ────────────────────────────────────────────────────────
var neetProducts = [
  {
    id: "neet-master-package",
    name: "NEET Master Megapack — Allen Complete",
    caption: "All Tests, Enthusiast Tests, Major Classroom material, NEET Modules, UG Parakh, PCB Handbook, PCB Race & Spark Modules. Everything an Allen student needs — at 53% off. 🔥 Bestseller.",
    price: 700, oldPrice: 1500, hot: true, classLevel: "NEET"
  },
  {
    id: "neet-tests",
    name: "NEET Test Series Bundle — Allen 2023–24",
    caption: "Full Allen test series including All Tests & Enthusiast Tests. Practice with the same papers used by top NEET rankers — and know exactly where you stand.",
    price: 199, oldPrice: 500, hot: false, classLevel: "NEET"
  },
  {
    id: "neet-modules",
    name: "NEET Modules Pack — Allen PCB Modules",
    caption: "Official Allen NEET Modules 2023–24 + Spark Modules. The most trusted study modules in NEET prep — now accessible without the coaching centre price tag.",
    price: 199, oldPrice: 500, hot: false, classLevel: "NEET"
  },
  {
    id: "neet-toppers-choice",
    name: "NEET Topper's Choice — Handpicked Books",
    caption: "A curated collection of the books that top NEET scorers actually studied from. Skip the guesswork — study what works, proven by results.",
    price: 150, oldPrice: 600, hot: false, classLevel: "NEET"
  },
];

// ── CLASS 10 ──────────────────────────────────────────────────────────────────
var class10Products = [
  {
    id: "class10-science",
    name: "Science Board Exam Cracker Pack",
    caption: "Books, past question papers & worksheets — everything to nail Class 10 Science in one clean bundle. Stop juggling resources and start scoring.",
    price: 99, oldPrice: 150, hot: false, classLevel: 10
  },
  {
    id: "class10-math",
    name: "Mathematics Complete Prep Kit",
    caption: "Top books, question papers & practice worksheets — the full package for Class 10 Math. Drill the right problems and walk into boards with zero surprises.",
    price: 99, oldPrice: 159, hot: false, classLevel: 10
  },
  {
    id: "class10-english",
    name: "English Score Booster Bundle",
    caption: "Curated books, question papers & worksheets that cover every section examiners test. The easiest subject to score high in — this kit makes sure you do.",
    price: 49, oldPrice: 129, hot: false, classLevel: 10
  },
  {
    id: "class10-sst",
    name: "Social Science All-in-One Pack",
    caption: "Books, past papers & study material for History, Geography, Civics & Economics — all wrapped up. Don't let SST slip your overall percentage down.",
    price: 99, oldPrice: 149, hot: false, classLevel: 10
  },
  {
    id: "class10-science-math-pyqs",
    name: "Science + Math Chapterwise PYQ Vault",
    caption: "Exclusive CBSE Class 10 chapterwise Previous Year Questions for Science & Math — the fastest way to spot patterns, predict questions & boost your score. 🔥 Bestseller.",
    price: 99, oldPrice: 199, hot: true, classLevel: 10
  },
  {
    id: "class10-educart-question-banks",
    name: "Educart 2025 Question Bank — All 4 Subjects",
    caption: "Official Educart Question Banks for English, Math, Science & SST (CBSE 2025 edition) — trusted by lakhs of students every year. Four books, one unbeatable price.",
    price: 149, oldPrice: 249, hot: false, classLevel: 10
  },
  {
    id: "class10-toppers-notes-science",
    name: "Science Topper's Handwritten Notes",
    caption: "Real handwritten notes from a top-scoring student — the kind your school topper won't share. Absorb their strategy, replicate their results.",
    price: 99, oldPrice: 159, hot: false, classLevel: 10
  },
  {
    id: "class10-toppers-notes-history",
    name: "History Topper's Handwritten Notes",
    caption: "Handwritten, exam-focused History notes straight from a class topper. Every important event, date & answer structured exactly the way examiners want.",
    price: 119, oldPrice: 280, hot: false, classLevel: 10
  },
  {
    id: "class10-toppers-notes-math",
    name: "Math Topper's Handwritten Notes",
    caption: "Quick-reference handwritten Math notes distilled from a topper's own prep. Great as a last-minute revision companion before your boards.",
    price: 9, oldPrice: 20, hot: false, classLevel: 10
  },
  {
    id: "class10-toppers-notes-geography",
    name: "Geography Topper's Handwritten Notes",
    caption: "Clean, concise handwritten Geography notes covering all the maps, concepts & answers worth marks. Written by a topper, priced for everyone.",
    price: 19, oldPrice: 50, hot: false, classLevel: 10
  },
  {
    id: "class10-toppers-notes-civics",
    name: "Civics Topper's Handwritten Notes",
    caption: "Structured handwritten Civics notes that make Political Science scoring and simple. The insider prep tool your competition probably already has.",
    price: 49, oldPrice: 140, hot: false, classLevel: 10
  },
];

// ── COMBINED & HELPERS ────────────────────────────────────────────────────────
var allProducts = class10Products.concat(class11Products).concat(class12Products).concat(jeeProducts).concat(neetProducts);

function findProduct(id) {
  return allProducts.find(function (p) { return p.id === id; });
}