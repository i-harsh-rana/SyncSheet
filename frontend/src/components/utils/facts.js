const fact = () =>{
    const index = Math.floor(Math.random()*92);
    return facts[index];
}

const facts = [
    { fact: "The oldest known written document dates back to 2600 BCE in Mesopotamia.", author: "Dr. Robert Temple" },
    { fact: "Paper was invented in China by Cai Lun around 105 AD.", author: "Joseph Needham" },
    { fact: "The Gutenberg Bible was the first major book printed using movable type.", author: "Johannes Gutenberg" },
    { fact: "The Dead Sea Scrolls contain the oldest known copies of biblical texts.", author: "Dr. Yigael Yadin" },
    { fact: "The U.S. Library of Congress holds over 170 million items, making it the largest library in the world.", author: "Carla Hayden" },
    { fact: "The average office worker uses 10,000 sheets of paper each year.", author: "Environmental Protection Agency (EPA)" },
    { fact: "Parchment, made from animal skins, was used before paper in ancient times.", author: "Richard Parkinson" },
    { fact: "Papyrus, made from plant fibers, was the primary writing material in ancient Egypt.", author: "Herodotus" },
    { fact: "Digital documents now surpass paper documents in most modern workplaces.", author: "IDC Research" },
    { fact: "The Codex, an early form of the modern book, replaced scrolls around the 2nd century AD.", author: "Pliny the Younger" },
    { fact: "The Rosetta Stone, discovered in 1799, helped scholars decipher Egyptian hieroglyphs.", author: "Jean-François Champollion" },
    { fact: "The first recorded use of a typewriter was in 1714.", author: "Henry Mill" },
    { fact: "A single gigabyte of data can hold approximately 1,000 books in digital form.", author: "Michael Lesk" },
    { fact: "In medieval Europe, books were so valuable they were often chained to desks in libraries.", author: "Christopher De Hamel" },
    { fact: "The Oxford English Dictionary took over 70 years to complete.", author: "Sir James Murray" },
    { fact: "The modern paperclip was patented by Johan Vaaler in 1899.", author: "Johan Vaaler" },
    { fact: "Knowledge-sharing through written documents is a key factor in the development of civilizations.", author: "Jared Diamond" },
    { fact: "The Sumerians are credited with the invention of writing, known as cuneiform.", author: "Samuel Noah Kramer" },
    { fact: "Braille is a tactile writing system used by visually impaired people, developed in 1824.", author: "Louis Braille" },
    { fact: "The longest handwritten document is 25,000 feet long, created in India.", author: "Guinness World Records" },
    { fact: "The use of cloud storage has revolutionized how businesses manage documents.", author: "Satya Nadella" },
    { fact: "Vellum, made from calfskin, was a preferred material for medieval manuscripts.", author: "Michelle P. Brown" },
    { fact: "The first email was sent by Ray Tomlinson in 1971.", author: "Ray Tomlinson" },
    { fact: "The concept of intellectual property is over 500 years old.", author: "Lawrence Lessig" },
    { fact: "The largest book in the world weighs 1.5 tons and is stored in Dubai.", author: "Saeed Al Gurg" },
    { fact: "The word 'paper' comes from 'papyrus,' an ancient Egyptian writing material.", author: "The Oxford Dictionary" },
    { fact: "In Japan, ‘washi’ paper is still handmade using traditional techniques.", author: "Yuko Fujimoto" },
    { fact: "The ‘cloud’ allows documents to be accessed from anywhere, at any time.", author: "Marc Benioff" },
    { fact: "PDF (Portable Document Format) was introduced by Adobe in 1993.", author: "John Warnock" },
    { fact: "The term ‘white paper’ originated from government documents printed on white stock paper.", author: "Winston Churchill" },
    { fact: "An exabyte of information is equivalent to 1 billion gigabytes.", author: "Peter Lyman" },
    { fact: "Recycled paper uses 60% less energy than virgin paper.", author: "Environmental Paper Network" },
    { fact: "More than 400 million tons of paper is produced globally each year.", author: "International Paper" },
    { fact: "Knowledge is power, but sharing knowledge brings exponential benefits.", author: "Peter Drucker" },
    { fact: "The Encyclopædia Britannica was first published in 1768.", author: "Colin Macfarquhar" },
    { fact: "The first smartphone with email capability was introduced by Blackberry in 2002.", author: "Mike Lazaridis" },
    { fact: "The world’s oldest library is located in Morocco, founded in 859 AD.", author: "Fatima al-Fihri" },
    { fact: "The word ‘document’ originates from the Latin word ‘documentum,’ meaning lesson or proof.", author: "Oxford Latin Dictionary" },
    { fact: "The Wright brothers signed their patent for the airplane on plain paper, not parchment.", author: "Orville Wright" },
    { fact: "The phrase ‘the pen is mightier than the sword’ was coined by Edward Bulwer-Lytton.", author: "Edward Bulwer-Lytton" },
    { fact: "The International Standard Book Number (ISBN) system was introduced in 1967.", author: "Gordon Foster" },
    { fact: "The average office desk has 400 times more bacteria than a toilet seat, partly due to paper.", author: "Charles Gerba" },
    { fact: "The Magna Carta, one of the most important legal documents, was written on parchment in 1215.", author: "King John of England" },
    { fact: "The first recorded library was in Nineveh, Assyria, dating back to 7th century BC.", author: "King Ashurbanipal" },
    { fact: "The first xerographic copier was introduced by Xerox in 1959.", author: "Chester Carlson" },
    { fact: "E-books now account for nearly 30% of all book sales.", author: "Pew Research Center" },
    { fact: "The Internet Archive has preserved over 400 billion web pages.", author: "Brewster Kahle" },
    { fact: "Each Google search is a query into a vast, constantly updated knowledge repository.", author: "Larry Page" },
    { fact: "The Dewey Decimal System was developed in 1876 as a way to classify library books.", author: "Melvil Dewey" },
    { fact: "The largest digital document repository is stored in CERN's data center, housing 100 petabytes of information.", author: "CERN" },
    { fact: "In medieval times, books were sometimes bound in human skin, known as anthropodermic bibliopegy.", author: "Megan Rosenbloom" },
    { fact: "Google processes over 3.5 billion searches per day, a massive flow of digital knowledge.", author: "Sundar Pichai" },
    { fact: "Every year, about 80 billion paper documents are printed worldwide.", author: "The Paperless Project" },
    { fact: "The average lifespan of a digital document is only about five years without proper management.", author: "Richard Pearce-Moses" },
    { fact: "Ink is over 4,500 years old, originating from ancient Egypt and China.", author: "Kurt Wehlte" },
    { fact: "QR codes are a modern form of embedding documents in physical spaces.", author: "Masahiro Hara" },
    { fact: "The Voynich Manuscript remains one of the world’s most mysterious documents, yet to be deciphered.", author: "William Voynich" },
    { fact: "Ancient Roman documents were often written on wax tablets.", author: "Pliny the Elder" },
    { fact: "The largest collection of Shakespeare’s documents is stored at the Folger Shakespeare Library.", author: "Henry Folger" },
    { fact: "The CIA is estimated to have over 100 million declassified documents available to the public.", author: "National Security Archive" },
    { fact: "Block printing originated in China as a method for copying Buddhist scriptures.", author: "Timothy Barrett" },
    { fact: "The earliest surviving illuminated manuscripts were created by Irish monks in the 7th century.", author: "Michelle Brown" },
    { fact: "The first national library, the Bibliotheca Alexandrina, was built in ancient Egypt.", author: "Strabo" },
    { fact: "Every year, around 4 trillion documents are created electronically.", author: "IDC Research" },
    { fact: "Fax machines transmit documents by scanning them and converting them into digital signals.", author: "Alexander Bain" },
    { fact: "The use of document watermarks dates back to 1282 in Italy.", author: "Paolo di Marco" },
    { fact: "Laser printing was developed by Gary Starkweather at Xerox in 1969.", author: "Gary Starkweather" },
    { fact: "Books were often chained to prevent theft in the Middle Ages.", author: "Richard Gameson" },
    { fact: "The Gutenberg printing press greatly increased the spread of knowledge in Europe.", author: "Johann Gutenberg" },
    { fact: "Hypertext, which is the basis of web links, was first conceived by Ted Nelson.", author: "Ted Nelson" },
    { fact: "The Codex Sinaiticus is the oldest complete copy of the New Testament, written in the 4th century.", author: "Constantine Tischendorf" },
    { fact: "The average typist types at a speed of 40 words per minute.", author: "Barbara Blackburn" },
    { fact: "The Oxford University library system holds more than 13 million printed documents.", author: "Bodley's Librarian" },
    { fact: "E-Ink technology, used in e-readers, mimics the appearance of ink on paper.", author: "Nick Sheridon" },
    { fact: "Before email, most business communication was done via inter-office memos and letters.", author: "Tom Standage" },
    { fact: "The first floppy disk, used to store digital documents, was developed in 1971.", author: "IBM" },
    { fact: "In 2017, over 281 billion emails were sent per day globally.", author: "Radicati Group" },
    { fact: "Archimedes' works were discovered in a 10th-century manuscript written over with religious text.", author: "William Noel" },
    { fact: "The U.S. Constitution is written on parchment and has survived for over 230 years.", author: "James Madison" },
    { fact: "Google Books aims to digitize and make searchable every book ever published.", author: "Sergey Brin" },
    { fact: "The first electronic document was created on a UNIVAC I computer in 1951.", author: "John W. Mauchly" },
    { fact: "Some paper is designed to be biodegradable to minimize environmental impact.", author: "Green Press Initiative" },
    { fact: "The longest word in any document is 189,819 letters long and describes a protein.", author: "Dr. George Church" },
    { fact: "The first website, created in 1991, described how to create web documents.", author: "Tim Berners-Lee" },
    { fact: "Digital signatures authenticate the identity of a document's sender.", author: "Whitfield Diffie" },
    { fact: "The British Library receives a copy of every book published in the UK and Ireland.", author: "British Library Act 1972" },
    { fact: "On average, businesses waste $20 per document in printing and handling costs.", author: "Association for Information and Image Management (AIIM)" },
    { fact: "Google Docs, launched in 2006, revolutionized collaborative document editing online.", author: "Sam Schillace" },
    { fact: "The oldest known library, in Ebla, Syria, dates back to 2500 BC.", author: "Giovanni Pettinato" },
    { fact: "The first known use of envelopes dates back to 3500 BC in ancient Mesopotamia.", author: "Samuel Noah Kramer" },
    { fact: "The idea of copyright law originated in the 18th century to protect writers' intellectual work.", author: "William Blackstone" },
    { fact: "Digital preservation is crucial to ensuring documents last for centuries in the digital age.", author: "Ross Harvey" },
    { fact: "The first inkjet printer was created in 1976 by Hewlett-Packard.", author: "John Vaught" }
  ];

 
  

export default fact;
  