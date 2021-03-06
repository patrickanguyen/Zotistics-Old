
const departments = [
    { name: "Include All Departments", value: "ALL" },
    { name: "AC ENG . . . . . .Academic English", value: "AC ENG" },
    { name: "AFAM . . . . . . . African American Studies", value: "AFAM" },
    { name: "ANATOMY . . . .Anatomy and Neurobiology", value: "ANATOMY" },
    { name: "ANESTH . . . . . Anesthesiology", value: "ANESTH" },
    { name: "ANTHRO . . . . . Anthropology", value: "ANTHRO" },
    { name: "ARABIC . . . . . .Arabic", value: "ARABIC" },
    { name: "ARMN . . . . . . .Armenian (started 2018 Spg)", value: "ARMN" },
    { name: "ART . . . . . . . . .Art", value: "ART" },
    { name: "ART HIS . . . . . .Art History", value: "ART HIS" },
    { name: "ARTS . . . . . . . Arts", value: "ARTS" },
    { name: "ARTSHUM . . . . Arts and Humanities", value: "ARTSHUM" },
    { name: "ASIANAM . . . . Asian American Studies", value: "ASIANAM" },
    { name: "BANA . . . . . . . Business Analytics (started 2017 SS2)", value: "BANA" },
    { name: "BATS . . . . . . . Biomedical and Translational Science", value: "BATS" },
    { name: "BIO SCI . . . . . .Biological Sciences", value: "BIO SCI" },
    { name: "BIOCHEM . . . . Biological Chemistry", value: "BIOCHEM" },
    { name: "BME . . . . . . . . Biomedical Engineering", value: "BME" },
    { name: "BSEMD . . . . . .Bio Sci & Educational Media Design (until 2017 Wtr)", value: "BSEMD" },
    { name: "CAMPREC . . . .Campus Recreation", value: "CAMPREC" },
    { name: "CBE . . . . . . . . Chemical and Biomolecular Engineering (started 2018 Fall)", value: "CBE" },
    { name: "CBEMS . . . . . .Chemical Engr and Materials Science (until 2019 SS2)", value: "CBEMS" },
    { name: "CEM . . . . . . . . Community and Environmental Medicine", value: "CEM" },
    { name: "CHC/LAT . . . . . Chicano Latino", value: "CHC/LAT" },
    { name: "CHEM . . . . . . .Chemistry", value: "CHEM" },
    { name: "CHINESE . . . . .Chinese", value: "CHINESE" },
    { name: "CLASSIC . . . . .Classics", value: "CLASSIC" },
    { name: "CLT&THY . . . . .Culture & Theory", value: "CLT&THY" },
    { name: "COGS . . . . . . . Cognitive Sciences  (started 2016 Fall)", value: "COGS" },
    { name: "COM LIT . . . . . Comparative Literature", value: "COM LIT" },
    { name: "COMPSCI . . . . Computer Science", value: "COMPSCI" },
    { name: "CRITISM . . . . . Criticism", value: "CRITISM" },
    { name: "CRM/LAW . . . . Criminology, Law and Society", value: "CRM/LAW" },
    { name: "CSE . . . . . . . . Computer Science and Engineering", value: "CSE" },
    { name: "DANCE . . . . . . Dance", value: "DANCE" },
    { name: "DERM . . . . . . .Dermatology", value: "DERM" },
    { name: "DEV BIO . . . . . Developmental and Cell Biology", value: "DEV BIO" },
    { name: "DRAMA . . . . . .Drama", value: "DRAMA" },
    { name: "E ASIAN . . . . . East Asian Languages and Literatures (until 2019 SS2)", value: "E ASIAN" },
    { name: "EARTHSS . . . . Earth System Science", value: "EARTHSS" },
    { name: "EAS . . . . . . . . East Asian Studies (started 2019 Fall)", value: "EAS" },
    { name: "ECO EVO . . . . Ecology and Evolutionary Biology", value: "ECO EVO" },
    { name: "ECON . . . . . . . Economics", value: "ECON" },
    { name: "ECPS . . . . . . . Embedded and Cyber-Physical Systems", value: "ECPS" },
    { name: "ED AFF . . . . . .Educational Affairs (Sch of Med)", value: "ED AFF" },
    { name: "EDUC . . . . . . . Education", value: "EDUC" },
    { name: "EECS . . . . . . . Electrical Engineering & Computer Science", value: "EECS" },
    { name: "EHS . . . . . . . . Environmental Health Sciences", value: "EHS" },
    { name: "ENGLISH . . . . .English", value: "ENGLISH" },
    { name: "ENGR . . . . . . . Engineering", value: "ENGR" },
    { name: "ENGRCEE . . . .Engineering, Civil and Environmental", value: "ENGRCEE" },
    { name: "ENGRMAE . . . .Engineering, Mechanical and Aerospace", value: "ENGRMAE" },
    { name: "ENGRMSE . . . .Materials Science and Engineering (until 2020 SS2)", value: "ENGRMSE" },
    { name: "EPIDEM . . . . . .Epidemiology", value: "EPIDEM" },
    { name: "ER MED . . . . . Emergency Medicine", value: "ER MED" },
    { name: "EURO ST . . . . .European Studies", value: "EURO ST" },
    { name: "FAM MED . . . . Family Medicine", value: "FAM MED" },
    { name: "FIN . . . . . . . . . Finance (started 2017 Fall)", value: "FIN" },
    { name: "FLM&MDA . . . .Film and Media Studies", value: "FLM&MDA" },
    { name: "FRENCH . . . . . French", value: "FRENCH" },
    { name: "GEN&SEX . . . . Gender and Sexuality Studies", value: "GEN&SEX" },
    { name: "GERMAN . . . . .German", value: "GERMAN" },
    { name: "GLBL ME . . . . .Global Middle East Studies (started 2016 Fall)", value: "GLBL ME" },
    { name: "GLBLCLT . . . . .Global Cultures", value: "GLBLCLT" },
    { name: "GREEK . . . . . . Greek", value: "GREEK" },
    { name: "HEBREW . . . . .Hebrew", value: "HEBREW" },
    { name: "HINDI . . . . . . . .Hindi", value: "HINDI" },
    { name: "HISTORY . . . . .History", value: "HISTORY" },
    { name: "HUMAN . . . . . .Humanities", value: "HUMAN" },
    { name: "HUMARTS . . . . Humanities and Arts", value: "HUMARTS" },
    { name: "I&C SCI . . . . . . Information and Computer Science", value: "I&C SCI" },
    { name: "IN4MATX . . . . . Informatics", value: "IN4MATX" },
    { name: "INNO . . . . . . . .Masters of Innovation and Entrepreneurship (started 2019 Fall)", value: "INNO" },
    { name: "INT MED . . . . . Internal Medicine", value: "INT MED" },
    { name: "INTL ST . . . . . . International Studies", value: "INTL ST" },
    { name: "IRAN . . . . . . . .Iranian (started 2020 Fall)", value: "IRAN" },
    { name: "ITALIAN . . . . . .Italian", value: "ITALIAN" },
    { name: "JAPANSE . . . . Japanese", value: "JAPANSE" },
    { name: "KOREAN . . . . .Korean", value: "KOREAN" },
    { name: "LATIN . . . . . . . Latin", value: "LATIN" },
    { name: "LAW . . . . . . . . Law", value: "LAW" },
    { name: "LINGUIS . . . . . .Linguistics (until 2019 SS2)", value: "LINGUIS" },
    { name: "LIT JRN . . . . . . Literary Journalism", value: "LIT JRN" },
    { name: "LPS . . . . . . . . .Logic and Philosophy of Science", value: "LPS" },
    { name: "LSCI . . . . . . . . Language Science (started 2019 Fall)", value: "LSCI" },
    { name: "M&MG . . . . . . .Microbiology and Molecular Genetics", value: "M&MG" },
    { name: "MATH . . . . . . . Mathematics", value: "MATH" },
    { name: "MED . . . . . . . . Medicine", value: "MED" },
    { name: "MED ED . . . . . Medical Education", value: "MED ED" },
    { name: "MED HUM . . . . Medical Humanities (started 2016 Fall)", value: "MED HUM" },
    { name: "MGMT . . . . . . .Management", value: "MGMT" },
    { name: "MGMT EP . . . . Executive MBA", value: "MGMT EP" },
    { name: "MGMT FE . . . . Fully Employed MBA", value: "MGMT FE" },
    { name: "MGMT HC . . . . Health Care MBA", value: "MGMT HC" },
    { name: "MGMTMBA . . . Management MBA", value: "MGMTMBA" },
    { name: "MGMTPHD . . . .Management PhD", value: "MGMTPHD" },
    { name: "MIC BIO . . . . . .Microbiology", value: "MIC BIO" },
    { name: "MOL BIO . . . . . Molecular Biology and Biochemistry", value: "MOL BIO" },
    { name: "MPAC . . . . . . .Accounting", value: "MPAC" },
    { name: "MSE . . . . . . . . Materials Science and Engineering (started 2020 Fall)", value: "MSE" },
    { name: "MUSIC . . . . . . .Music", value: "MUSIC" },
    { name: "NET SYS . . . . .Networked Systems", value: "NET SYS" },
    { name: "NEURBIO . . . . .Neurobiology and Behavior", value: "NEURBIO" },
    { name: "NEUROL . . . . . Neurology", value: "NEUROL" },
    { name: "NUR SCI . . . . . Nursing Science", value: "NUR SCI" },
    { name: "OB/GYN . . . . . Obstetrics and Gynecology", value: "OB/GYN" },
    { name: "OPHTHAL . . . . Ophthalmology", value: "OPHTHAL" },
    { name: "PATH . . . . . . . Pathology and Laboratory Medicine", value: "PATH" },
    { name: "PED GEN . . . . Pediatrics Genetics", value: "PED GEN" },
    { name: "PEDS . . . . . . . Pediatrics", value: "PEDS" },
    { name: "PERSIAN . . . . .Persian", value: "PERSIAN" },
    { name: "PHARM . . . . . .Medical Pharmacology", value: "PHARM" },
    { name: "PHILOS . . . . . .Philosophy", value: "PHILOS" },
    { name: "PHRMSCI . . . . Pharmaceutical Sciences", value: "PHRMSCI" },
    { name: "PHY SCI . . . . . Physical Science", value: "PHY SCI" },
    { name: "PHYSICS . . . . .Physics", value: "PHYSICS" },
    { name: "PHYSIO . . . . . .Physiology and Biophysics", value: "PHYSIO" },
    { name: "PLASTIC . . . . . Plastic Surgery", value: "PLASTIC" },
    { name: "PM&R . . . . . . .Physical Medicine and Rehabilitation", value: "PM&R" },
    { name: "POL SCI . . . . . Political Science", value: "POL SCI" },
    { name: "PORTUG . . . . . Portuguese", value: "PORTUG" },
    { name: "PP&D . . . . . . . Planning, Policy, and Design (until 2018 SS2; see UPPP)", value: "PP&D" },
    { name: "PSCI . . . . . . . .Psychological Science (started 2019 Fall)", value: "PSCI" },
    { name: "PSY BEH . . . . .Psychology and Social Behavior (until 2019 SS2)", value: "PSY BEH" },
    { name: "PSYCH . . . . . . Psychology", value: "PSYCH" },
    { name: "PUB POL . . . . .Public Policy", value: "PUB POL" },
    { name: "PUBHLTH . . . . Public Health", value: "PUBHLTH" },
    { name: "RADIO . . . . . . .Radiology", value: "RADIO" },
    { name: "REL STD . . . . . Religious Studies", value: "REL STD" },
    { name: "ROTC . . . . . . . Reserve Officers' Training Corps", value: "ROTC" },
    { name: "RUSSIAN . . . . .Russian", value: "RUSSIAN" },
    { name: "SOC SCI . . . . . Social Science", value: "SOC SCI" },
    { name: "SOCECOL . . . . Social Ecology", value: "SOCECOL" },
    { name: "SOCIOL . . . . . .Sociology", value: "SOCIOL" },
    { name: "SPANISH . . . . .Spanish", value: "SPANISH" },
    { name: "SPPS . . . . . . . Social Policy & Public Service (started 2016 Wtr)", value: "SPPS" },
    { name: "STATS . . . . . . .Statistics", value: "STATS" },
    { name: "SURGERY . . . .Surgery", value: "SURGERY" },
    { name: "SWE . . . . . . . .Software Engineering (started 2019 Fall)", value: "SWE" },
    { name: "TAGALOG . . . . Tagalog", value: "TAGALOG" },
    { name: "TOX . . . . . . . . .Toxicology", value: "TOX" },
    { name: "UCDC . . . . . . . UC Washington DC", value: "UCDC" },
    { name: "UNI AFF . . . . . .University Affairs", value: "UNI AFF" },
    { name: "UNI STU . . . . . .University Studies", value: "UNI STU" },
    { name: "UPPP . . . . . . . Urban Planning and Public Policy (started 2018 Fall)", value: "UPPP" },
    { name: "VIETMSE . . . . .Vietnamese", value: "VIETMSE" },
    { name: "VIS STD . . . . . .Visual Studies", value: "VIS STD" },
    { name: "WRITING . . . . . Writing", value: "WRITING" }
];

module.exports.departments = departments;