import { check, validationResult } from 'express-validator';

export const isInputEmpty = (val) => isUndefined(val) || isEmptyString(val)

export const isEmptyString = (val) => {
  return isString(val) && !val.length
}
export const isInteger = (val) => {
  return typeof val !== 'undefined'
  && (val === parseInt(val, 10));
}
export const isPositiveInteger = (val) => isInteger(val) && val >= 0
export const isString = (val) => typeof val === 'string' || val instanceof String
export const isValidCurrency = (val) => {
  const currenciesWithOnlyThreeLetterSymbol = listOfCurrencies().map(currency => currency.cc);
  return currenciesWithOnlyThreeLetterSymbol.includes(val)
}

export const isValidTwoLetterCodeCountry = (val) => {
  const listOfTwoLetterCodeCountries = listOfCountries().map(country => country.alpha2.toUpperCase())
  return listOfTwoLetterCodeCountries.includes(val)
}

export const isValidEmail = (email) => {
  const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email) {
    email = email.toLowerCase()
  }
  return emailValidationRegex.test(email);
}

export const isCustomerNameValid = (val) => {
  const validationRegexForOnlyLettersAndSpace = /^[a-zA-Z\s]*$/
  return validationRegexForOnlyLettersAndSpace.test(val);
}

export const isBoolean = (val) => {
  return typeof (val) === "boolean"
}

export const isUndefined = (val) => {
  return typeof (val) === 'undefined';
}

export const listOfPaymentEntityTypes = (val) => {
  return [
    'CREDIT-CARD',
    'DEBIT-CARD',
    'BANK-ACCOUNT',
    'USSD',
    'WALLET-ID'
  ]
}

export const listOfPaymentEntityCardTypes = (val) => {
  return [
    'CREDIT-CARD',
    'DEBIT-CARD',
  ]
}

export const isValidPaymentEntityType = (val) => {
  return listOfPaymentEntityTypes().includes(val)
}

export const paymentEntityTypeIsACard = (val) => {
  return listOfPaymentEntityCardTypes().includes(val)
}

export const isValidMaskedCardNumber = (val) => {
  const regexForValidation = /^\d{6}\*{6}\d{4}$/
  return regexForValidation.test(val)
}

export const isValidSixID = (val) => {
  return isPositiveInteger(val) && val.toString().length === 6
}
// {
//   "ID": 91203, // must be number
//   "Amount": 5000, // must be number
//   "Currency": "NGN", // must be 3 letter string
//   "CurrencyCountry": "NG", // must be 2 letter string
//   "Customer": {
//       "ID": 2211232, // must be number and not empty
//       "EmailAddress": "anonimized29900@anon.io", // must be valid email and not empty
//       "FullName": "Abel Eden", // must be string and not empty
//       "BearsFee": true // must be boolean and not empty
//   },
//   "PaymentEntity": {
//       "ID": 2203454, // must be number
//       "Issuer": "GTBANK", // must be string
//       "Brand": "MASTERCARD", // must be string
//       "Number": "530191******2903", //must be string
//       "SixID": 530191, // must be number
//       "Type": "CREDIT-CARD", // must be string and one of CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID
//       "Country": "NG" // must be two letter string
//   }
// }

const listOfCurrencies = () => {
  return [
    {"cc":"AED","symbol":"\u062f.\u0625;","name":"UAE dirham"},
    {"cc":"AFN","symbol":"Afs","name":"Afghan afghani"},
    {"cc":"ALL","symbol":"L","name":"Albanian lek"},
    {"cc":"AMD","symbol":"AMD","name":"Armenian dram"},
    {"cc":"ANG","symbol":"NA\u0192","name":"Netherlands Antillean gulden"},
    {"cc":"AOA","symbol":"Kz","name":"Angolan kwanza"},
    {"cc":"ARS","symbol":"$","name":"Argentine peso"},
    {"cc":"AUD","symbol":"$","name":"Australian dollar"},
    {"cc":"AWG","symbol":"\u0192","name":"Aruban florin"},
    {"cc":"AZN","symbol":"AZN","name":"Azerbaijani manat"},
    {"cc":"BAM","symbol":"KM","name":"Bosnia and Herzegovina konvertibilna marka"},
    {"cc":"BBD","symbol":"Bds$","name":"Barbadian dollar"},
    {"cc":"BDT","symbol":"\u09f3","name":"Bangladeshi taka"},
    {"cc":"BGN","symbol":"BGN","name":"Bulgarian lev"},
    {"cc":"BHD","symbol":".\u062f.\u0628","name":"Bahraini dinar"},
    {"cc":"BIF","symbol":"FBu","name":"Burundi franc"},
    {"cc":"BMD","symbol":"BD$","name":"Bermudian dollar"},
    {"cc":"BND","symbol":"B$","name":"Brunei dollar"},
    {"cc":"BOB","symbol":"Bs.","name":"Bolivian boliviano"},
    {"cc":"BRL","symbol":"R$","name":"Brazilian real"},
    {"cc":"BSD","symbol":"B$","name":"Bahamian dollar"},
    {"cc":"BTN","symbol":"Nu.","name":"Bhutanese ngultrum"},
    {"cc":"BWP","symbol":"P","name":"Botswana pula"},
    {"cc":"BYR","symbol":"Br","name":"Belarusian ruble"},
    {"cc":"BZD","symbol":"BZ$","name":"Belize dollar"},
    {"cc":"CAD","symbol":"$","name":"Canadian dollar"},
    {"cc":"CDF","symbol":"F","name":"Congolese franc"},
    {"cc":"CHF","symbol":"Fr.","name":"Swiss franc"},
    {"cc":"CLP","symbol":"$","name":"Chilean peso"},
    {"cc":"CNY","symbol":"\u00a5","name":"Chinese/Yuan renminbi"},
    {"cc":"COP","symbol":"Col$","name":"Colombian peso"},
    {"cc":"CRC","symbol":"\u20a1","name":"Costa Rican colon"},
    {"cc":"CUC","symbol":"$","name":"Cuban peso"},
    {"cc":"CVE","symbol":"Esc","name":"Cape Verdean escudo"},
    {"cc":"CZK","symbol":"K\u010d","name":"Czech koruna"},
    {"cc":"DJF","symbol":"Fdj","name":"Djiboutian franc"},
    {"cc":"DKK","symbol":"Kr","name":"Danish krone"},
    {"cc":"DOP","symbol":"RD$","name":"Dominican peso"},
    {"cc":"DZD","symbol":"\u062f.\u062c","name":"Algerian dinar"},
    {"cc":"EEK","symbol":"KR","name":"Estonian kroon"},
    {"cc":"EGP","symbol":"\u00a3","name":"Egyptian pound"},
    {"cc":"ERN","symbol":"Nfa","name":"Eritrean nakfa"},
    {"cc":"ETB","symbol":"Br","name":"Ethiopian birr"},
    {"cc":"EUR","symbol":"\u20ac","name":"European Euro"},
    {"cc":"FJD","symbol":"FJ$","name":"Fijian dollar"},
    {"cc":"FKP","symbol":"\u00a3","name":"Falkland Islands pound"},
    {"cc":"GBP","symbol":"\u00a3","name":"British pound"},
    {"cc":"GEL","symbol":"GEL","name":"Georgian lari"},
    {"cc":"GHS","symbol":"GH\u20b5","name":"Ghanaian cedi"},
    {"cc":"GIP","symbol":"\u00a3","name":"Gibraltar pound"},
    {"cc":"GMD","symbol":"D","name":"Gambian dalasi"},
    {"cc":"GNF","symbol":"FG","name":"Guinean franc"},
    {"cc":"GQE","symbol":"CFA","name":"Central African CFA franc"},
    {"cc":"GTQ","symbol":"Q","name":"Guatemalan quetzal"},
    {"cc":"GYD","symbol":"GY$","name":"Guyanese dollar"},
    {"cc":"HKD","symbol":"HK$","name":"Hong Kong dollar"},
    {"cc":"HNL","symbol":"L","name":"Honduran lempira"},
    {"cc":"HRK","symbol":"kn","name":"Croatian kuna"},
    {"cc":"HTG","symbol":"G","name":"Haitian gourde"},
    {"cc":"HUF","symbol":"Ft","name":"Hungarian forint"},
    {"cc":"IDR","symbol":"Rp","name":"Indonesian rupiah"},
    {"cc":"ILS","symbol":"\u20aa","name":"Israeli new sheqel"},
    {"cc":"INR","symbol":"\u20B9","name":"Indian rupee"},
    {"cc":"IQD","symbol":"\u062f.\u0639","name":"Iraqi dinar"},
    {"cc":"IRR","symbol":"IRR","name":"Iranian rial"},
    {"cc":"ISK","symbol":"kr","name":"Icelandic kr\u00f3na"},
    {"cc":"JMD","symbol":"J$","name":"Jamaican dollar"},
    {"cc":"JOD","symbol":"JOD","name":"Jordanian dinar"},
    {"cc":"JPY","symbol":"\u00a5","name":"Japanese yen"},
    {"cc":"KES","symbol":"KSh","name":"Kenyan shilling"},
    {"cc":"KGS","symbol":"\u0441\u043e\u043c","name":"Kyrgyzstani som"},
    {"cc":"KHR","symbol":"\u17db","name":"Cambodian riel"},
    {"cc":"KMF","symbol":"KMF","name":"Comorian franc"},
    {"cc":"KPW","symbol":"W","name":"North Korean won"},
    {"cc":"KRW","symbol":"W","name":"South Korean won"},
    {"cc":"KWD","symbol":"KWD","name":"Kuwaiti dinar"},
    {"cc":"KYD","symbol":"KY$","name":"Cayman Islands dollar"},
    {"cc":"KZT","symbol":"T","name":"Kazakhstani tenge"},
    {"cc":"LAK","symbol":"KN","name":"Lao kip"},
    {"cc":"LBP","symbol":"\u00a3","name":"Lebanese lira"},
    {"cc":"LKR","symbol":"Rs","name":"Sri Lankan rupee"},
    {"cc":"LRD","symbol":"L$","name":"Liberian dollar"},
    {"cc":"LSL","symbol":"M","name":"Lesotho loti"},
    {"cc":"LTL","symbol":"Lt","name":"Lithuanian litas"},
    {"cc":"LVL","symbol":"Ls","name":"Latvian lats"},
    {"cc":"LYD","symbol":"LD","name":"Libyan dinar"},
    {"cc":"MAD","symbol":"MAD","name":"Moroccan dirham"},
    {"cc":"MDL","symbol":"MDL","name":"Moldovan leu"},
    {"cc":"MGA","symbol":"FMG","name":"Malagasy ariary"},
    {"cc":"MKD","symbol":"MKD","name":"Macedonian denar"},
    {"cc":"MMK","symbol":"K","name":"Myanma kyat"},
    {"cc":"MNT","symbol":"\u20ae","name":"Mongolian tugrik"},
    {"cc":"MOP","symbol":"P","name":"Macanese pataca"},
    {"cc":"MRO","symbol":"UM","name":"Mauritanian ouguiya"},
    {"cc":"MUR","symbol":"Rs","name":"Mauritian rupee"},
    {"cc":"MVR","symbol":"Rf","name":"Maldivian rufiyaa"},
    {"cc":"MWK","symbol":"MK","name":"Malawian kwacha"},
    {"cc":"MXN","symbol":"$","name":"Mexican peso"},
    {"cc":"MYR","symbol":"RM","name":"Malaysian ringgit"},
    {"cc":"MZM","symbol":"MTn","name":"Mozambican metical"},
    {"cc":"NAD","symbol":"N$","name":"Namibian dollar"},
    {"cc":"NGN","symbol":"\u20a6","name":"Nigerian naira"},
    {"cc":"NIO","symbol":"C$","name":"Nicaraguan c\u00f3rdoba"},
    {"cc":"NOK","symbol":"kr","name":"Norwegian krone"},
    {"cc":"NPR","symbol":"NRs","name":"Nepalese rupee"},
    {"cc":"NZD","symbol":"NZ$","name":"New Zealand dollar"},
    {"cc":"OMR","symbol":"OMR","name":"Omani rial"},
    {"cc":"PAB","symbol":"B./","name":"Panamanian balboa"},
    {"cc":"PEN","symbol":"S/.","name":"Peruvian nuevo sol"},
    {"cc":"PGK","symbol":"K","name":"Papua New Guinean kina"},
    {"cc":"PHP","symbol":"\u20b1","name":"Philippine peso"},
    {"cc":"PKR","symbol":"Rs.","name":"Pakistani rupee"},
    {"cc":"PLN","symbol":"z\u0142","name":"Polish zloty"},
    {"cc":"PYG","symbol":"\u20b2","name":"Paraguayan guarani"},
    {"cc":"QAR","symbol":"QR","name":"Qatari riyal"},
    {"cc":"RON","symbol":"L","name":"Romanian leu"},
    {"cc":"RSD","symbol":"din.","name":"Serbian dinar"},
    {"cc":"RUB","symbol":"R","name":"Russian ruble"},
    {"cc":"SAR","symbol":"SR","name":"Saudi riyal"},
    {"cc":"SBD","symbol":"SI$","name":"Solomon Islands dollar"},
    {"cc":"SCR","symbol":"SR","name":"Seychellois rupee"},
    {"cc":"SDG","symbol":"SDG","name":"Sudanese pound"},
    {"cc":"SEK","symbol":"kr","name":"Swedish krona"},
    {"cc":"SGD","symbol":"S$","name":"Singapore dollar"},
    {"cc":"SHP","symbol":"\u00a3","name":"Saint Helena pound"},
    {"cc":"SLL","symbol":"Le","name":"Sierra Leonean leone"},
    {"cc":"SOS","symbol":"Sh.","name":"Somali shilling"},
    {"cc":"SRD","symbol":"$","name":"Surinamese dollar"},
    {"cc":"SYP","symbol":"LS","name":"Syrian pound"},
    {"cc":"SZL","symbol":"E","name":"Swazi lilangeni"},
    {"cc":"THB","symbol":"\u0e3f","name":"Thai baht"},
    {"cc":"TJS","symbol":"TJS","name":"Tajikistani somoni"},
    {"cc":"TMT","symbol":"m","name":"Turkmen manat"},
    {"cc":"TND","symbol":"DT","name":"Tunisian dinar"},
    {"cc":"TRY","symbol":"TRY","name":"Turkish new lira"},
    {"cc":"TTD","symbol":"TT$","name":"Trinidad and Tobago dollar"},
    {"cc":"TWD","symbol":"NT$","name":"New Taiwan dollar"},
    {"cc":"TZS","symbol":"TZS","name":"Tanzanian shilling"},
    {"cc":"UAH","symbol":"UAH","name":"Ukrainian hryvnia"},
    {"cc":"UGX","symbol":"USh","name":"Ugandan shilling"},
    {"cc":"USD","symbol":"US$","name":"United States dollar"},
    {"cc":"UYU","symbol":"$U","name":"Uruguayan peso"},
    {"cc":"UZS","symbol":"UZS","name":"Uzbekistani som"},
    {"cc":"VEB","symbol":"Bs","name":"Venezuelan bolivar"},
    {"cc":"VND","symbol":"\u20ab","name":"Vietnamese dong"},
    {"cc":"VUV","symbol":"VT","name":"Vanuatu vatu"},
    {"cc":"WST","symbol":"WS$","name":"Samoan tala"},
    {"cc":"XAF","symbol":"CFA","name":"Central African CFA franc"},
    {"cc":"XCD","symbol":"EC$","name":"East Caribbean dollar"},
    {"cc":"XDR","symbol":"SDR","name":"Special Drawing Rights"},
    {"cc":"XOF","symbol":"CFA","name":"West African CFA franc"},
    {"cc":"XPF","symbol":"F","name":"CFP franc"},
    {"cc":"YER","symbol":"YER","name":"Yemeni rial"},
    {"cc":"ZAR","symbol":"R","name":"South African rand"},
    {"cc":"ZMK","symbol":"ZK","name":"Zambian kwacha"},
    {"cc":"ZWR","symbol":"Z$","name":"Zimbabwean dollar"}
  ]
}

const listOfCountries = () => {
  return [
    {"id":4,"alpha2":"af","alpha3":"afg","name":"Afghanistan"},
    {"id":8,"alpha2":"al","alpha3":"alb","name":"Albania"},
    {"id":12,"alpha2":"dz","alpha3":"dza","name":"Algeria"},
    {"id":20,"alpha2":"ad","alpha3":"and","name":"Andorra"},
    {"id":24,"alpha2":"ao","alpha3":"ago","name":"Angola"},
    {"id":28,"alpha2":"ag","alpha3":"atg","name":"Antigua and Barbuda"},
    {"id":32,"alpha2":"ar","alpha3":"arg","name":"Argentina"},
    {"id":51,"alpha2":"am","alpha3":"arm","name":"Armenia"},
    {"id":36,"alpha2":"au","alpha3":"aus","name":"Australia"},
    {"id":40,"alpha2":"at","alpha3":"aut","name":"Austria"},
    {"id":31,"alpha2":"az","alpha3":"aze","name":"Azerbaijan"},
    {"id":44,"alpha2":"bs","alpha3":"bhs","name":"Bahamas"},
    {"id":48,"alpha2":"bh","alpha3":"bhr","name":"Bahrain"},
    {"id":50,"alpha2":"bd","alpha3":"bgd","name":"Bangladesh"},
    {"id":52,"alpha2":"bb","alpha3":"brb","name":"Barbados"},
    {"id":112,"alpha2":"by","alpha3":"blr","name":"Belarus"},
    {"id":56,"alpha2":"be","alpha3":"bel","name":"Belgium"},
    {"id":84,"alpha2":"bz","alpha3":"blz","name":"Belize"},
    {"id":204,"alpha2":"bj","alpha3":"ben","name":"Benin"},
    {"id":64,"alpha2":"bt","alpha3":"btn","name":"Bhutan"},
    {"id":68,"alpha2":"bo","alpha3":"bol","name":"Bolivia (Plurinational State of)"},
    {"id":70,"alpha2":"ba","alpha3":"bih","name":"Bosnia and Herzegovina"},
    {"id":72,"alpha2":"bw","alpha3":"bwa","name":"Botswana"},
    {"id":76,"alpha2":"br","alpha3":"bra","name":"Brazil"},
    {"id":96,"alpha2":"bn","alpha3":"brn","name":"Brunei Darussalam"},
    {"id":100,"alpha2":"bg","alpha3":"bgr","name":"Bulgaria"},
    {"id":854,"alpha2":"bf","alpha3":"bfa","name":"Burkina Faso"},
    {"id":108,"alpha2":"bi","alpha3":"bdi","name":"Burundi"},
    {"id":132,"alpha2":"cv","alpha3":"cpv","name":"Cabo Verde"},
    {"id":116,"alpha2":"kh","alpha3":"khm","name":"Cambodia"},
    {"id":120,"alpha2":"cm","alpha3":"cmr","name":"Cameroon"},
    {"id":124,"alpha2":"ca","alpha3":"can","name":"Canada"},
    {"id":140,"alpha2":"cf","alpha3":"caf","name":"Central African Republic"},
    {"id":148,"alpha2":"td","alpha3":"tcd","name":"Chad"},
    {"id":152,"alpha2":"cl","alpha3":"chl","name":"Chile"},
    {"id":156,"alpha2":"cn","alpha3":"chn","name":"China"},
    {"id":170,"alpha2":"co","alpha3":"col","name":"Colombia"},
    {"id":174,"alpha2":"km","alpha3":"com","name":"Comoros"},
    {"id":178,"alpha2":"cg","alpha3":"cog","name":"Congo"},
    {"id":180,"alpha2":"cd","alpha3":"cod","name":"Congo, Democratic Republic of the"},
    {"id":188,"alpha2":"cr","alpha3":"cri","name":"Costa Rica"},
    {"id":384,"alpha2":"ci","alpha3":"civ","name":"Côte d'Ivoire"},
    {"id":191,"alpha2":"hr","alpha3":"hrv","name":"Croatia"},
    {"id":192,"alpha2":"cu","alpha3":"cub","name":"Cuba"},
    {"id":196,"alpha2":"cy","alpha3":"cyp","name":"Cyprus"},
    {"id":203,"alpha2":"cz","alpha3":"cze","name":"Czechia"},
    {"id":208,"alpha2":"dk","alpha3":"dnk","name":"Denmark"},
    {"id":262,"alpha2":"dj","alpha3":"dji","name":"Djibouti"},
    {"id":212,"alpha2":"dm","alpha3":"dma","name":"Dominica"},
    {"id":214,"alpha2":"do","alpha3":"dom","name":"Dominican Republic"},
    {"id":218,"alpha2":"ec","alpha3":"ecu","name":"Ecuador"},
    {"id":818,"alpha2":"eg","alpha3":"egy","name":"Egypt"},
    {"id":222,"alpha2":"sv","alpha3":"slv","name":"El Salvador"},
    {"id":226,"alpha2":"gq","alpha3":"gnq","name":"Equatorial Guinea"},
    {"id":232,"alpha2":"er","alpha3":"eri","name":"Eritrea"},
    {"id":233,"alpha2":"ee","alpha3":"est","name":"Estonia"},
    {"id":748,"alpha2":"sz","alpha3":"swz","name":"Eswatini"},
    {"id":231,"alpha2":"et","alpha3":"eth","name":"Ethiopia"},
    {"id":242,"alpha2":"fj","alpha3":"fji","name":"Fiji"},
    {"id":246,"alpha2":"fi","alpha3":"fin","name":"Finland"},
    {"id":250,"alpha2":"fr","alpha3":"fra","name":"France"},
    {"id":266,"alpha2":"ga","alpha3":"gab","name":"Gabon"},
    {"id":270,"alpha2":"gm","alpha3":"gmb","name":"Gambia"},
    {"id":268,"alpha2":"ge","alpha3":"geo","name":"Georgia"},
    {"id":276,"alpha2":"de","alpha3":"deu","name":"Germany"},
    {"id":288,"alpha2":"gh","alpha3":"gha","name":"Ghana"},
    {"id":300,"alpha2":"gr","alpha3":"grc","name":"Greece"},
    {"id":308,"alpha2":"gd","alpha3":"grd","name":"Grenada"},
    {"id":320,"alpha2":"gt","alpha3":"gtm","name":"Guatemala"},
    {"id":324,"alpha2":"gn","alpha3":"gin","name":"Guinea"},
    {"id":624,"alpha2":"gw","alpha3":"gnb","name":"Guinea-Bissau"},
    {"id":328,"alpha2":"gy","alpha3":"guy","name":"Guyana"},
    {"id":332,"alpha2":"ht","alpha3":"hti","name":"Haiti"},
    {"id":340,"alpha2":"hn","alpha3":"hnd","name":"Honduras"},
    {"id":348,"alpha2":"hu","alpha3":"hun","name":"Hungary"},
    {"id":352,"alpha2":"is","alpha3":"isl","name":"Iceland"},
    {"id":356,"alpha2":"in","alpha3":"ind","name":"India"},
    {"id":360,"alpha2":"id","alpha3":"idn","name":"Indonesia"},
    {"id":364,"alpha2":"ir","alpha3":"irn","name":"Iran (Islamic Republic of)"},
    {"id":368,"alpha2":"iq","alpha3":"irq","name":"Iraq"},
    {"id":372,"alpha2":"ie","alpha3":"irl","name":"Ireland"},
    {"id":376,"alpha2":"il","alpha3":"isr","name":"Israel"},
    {"id":380,"alpha2":"it","alpha3":"ita","name":"Italy"},
    {"id":388,"alpha2":"jm","alpha3":"jam","name":"Jamaica"},
    {"id":392,"alpha2":"jp","alpha3":"jpn","name":"Japan"},
    {"id":400,"alpha2":"jo","alpha3":"jor","name":"Jordan"},
    {"id":398,"alpha2":"kz","alpha3":"kaz","name":"Kazakhstan"},
    {"id":404,"alpha2":"ke","alpha3":"ken","name":"Kenya"},
    {"id":296,"alpha2":"ki","alpha3":"kir","name":"Kiribati"},
    {"id":408,"alpha2":"kp","alpha3":"prk","name":"Korea (Democratic People's Republic of)"},
    {"id":410,"alpha2":"kr","alpha3":"kor","name":"Korea, Republic of"},
    {"id":414,"alpha2":"kw","alpha3":"kwt","name":"Kuwait"},
    {"id":417,"alpha2":"kg","alpha3":"kgz","name":"Kyrgyzstan"},
    {"id":418,"alpha2":"la","alpha3":"lao","name":"Lao People's Democratic Republic"},
    {"id":428,"alpha2":"lv","alpha3":"lva","name":"Latvia"},
    {"id":422,"alpha2":"lb","alpha3":"lbn","name":"Lebanon"},
    {"id":426,"alpha2":"ls","alpha3":"lso","name":"Lesotho"},
    {"id":430,"alpha2":"lr","alpha3":"lbr","name":"Liberia"},
    {"id":434,"alpha2":"ly","alpha3":"lby","name":"Libya"},
    {"id":438,"alpha2":"li","alpha3":"lie","name":"Liechtenstein"},
    {"id":440,"alpha2":"lt","alpha3":"ltu","name":"Lithuania"},
    {"id":442,"alpha2":"lu","alpha3":"lux","name":"Luxembourg"},
    {"id":450,"alpha2":"mg","alpha3":"mdg","name":"Madagascar"},
    {"id":454,"alpha2":"mw","alpha3":"mwi","name":"Malawi"},
    {"id":458,"alpha2":"my","alpha3":"mys","name":"Malaysia"},
    {"id":462,"alpha2":"mv","alpha3":"mdv","name":"Maldives"},
    {"id":466,"alpha2":"ml","alpha3":"mli","name":"Mali"},
    {"id":470,"alpha2":"mt","alpha3":"mlt","name":"Malta"},
    {"id":584,"alpha2":"mh","alpha3":"mhl","name":"Marshall Islands"},
    {"id":478,"alpha2":"mr","alpha3":"mrt","name":"Mauritania"},
    {"id":480,"alpha2":"mu","alpha3":"mus","name":"Mauritius"},
    {"id":484,"alpha2":"mx","alpha3":"mex","name":"Mexico"},
    {"id":583,"alpha2":"fm","alpha3":"fsm","name":"Micronesia (Federated States of)"},
    {"id":498,"alpha2":"md","alpha3":"mda","name":"Moldova, Republic of"},
    {"id":492,"alpha2":"mc","alpha3":"mco","name":"Monaco"},
    {"id":496,"alpha2":"mn","alpha3":"mng","name":"Mongolia"},
    {"id":499,"alpha2":"me","alpha3":"mne","name":"Montenegro"},
    {"id":504,"alpha2":"ma","alpha3":"mar","name":"Morocco"},
    {"id":508,"alpha2":"mz","alpha3":"moz","name":"Mozambique"},
    {"id":104,"alpha2":"mm","alpha3":"mmr","name":"Myanmar"},
    {"id":516,"alpha2":"na","alpha3":"nam","name":"Namibia"},
    {"id":520,"alpha2":"nr","alpha3":"nru","name":"Nauru"},
    {"id":524,"alpha2":"np","alpha3":"npl","name":"Nepal"},
    {"id":528,"alpha2":"nl","alpha3":"nld","name":"Netherlands"},
    {"id":554,"alpha2":"nz","alpha3":"nzl","name":"New Zealand"},
    {"id":558,"alpha2":"ni","alpha3":"nic","name":"Nicaragua"},
    {"id":562,"alpha2":"ne","alpha3":"ner","name":"Niger"},
    {"id":566,"alpha2":"ng","alpha3":"nga","name":"Nigeria"},
    {"id":807,"alpha2":"mk","alpha3":"mkd","name":"North Macedonia"},
    {"id":578,"alpha2":"no","alpha3":"nor","name":"Norway"},
    {"id":512,"alpha2":"om","alpha3":"omn","name":"Oman"},
    {"id":586,"alpha2":"pk","alpha3":"pak","name":"Pakistan"},
    {"id":585,"alpha2":"pw","alpha3":"plw","name":"Palau"},
    {"id":591,"alpha2":"pa","alpha3":"pan","name":"Panama"},
    {"id":598,"alpha2":"pg","alpha3":"png","name":"Papua New Guinea"},
    {"id":600,"alpha2":"py","alpha3":"pry","name":"Paraguay"},
    {"id":604,"alpha2":"pe","alpha3":"per","name":"Peru"},
    {"id":608,"alpha2":"ph","alpha3":"phl","name":"Philippines"},
    {"id":616,"alpha2":"pl","alpha3":"pol","name":"Poland"},
    {"id":620,"alpha2":"pt","alpha3":"prt","name":"Portugal"},
    {"id":634,"alpha2":"qa","alpha3":"qat","name":"Qatar"},
    {"id":642,"alpha2":"ro","alpha3":"rou","name":"Romania"},
    {"id":643,"alpha2":"ru","alpha3":"rus","name":"Russian Federation"},
    {"id":646,"alpha2":"rw","alpha3":"rwa","name":"Rwanda"},
    {"id":659,"alpha2":"kn","alpha3":"kna","name":"Saint Kitts and Nevis"},
    {"id":662,"alpha2":"lc","alpha3":"lca","name":"Saint Lucia"},
    {"id":670,"alpha2":"vc","alpha3":"vct","name":"Saint Vincent and the Grenadines"},
    {"id":882,"alpha2":"ws","alpha3":"wsm","name":"Samoa"},
    {"id":674,"alpha2":"sm","alpha3":"smr","name":"San Marino"},
    {"id":678,"alpha2":"st","alpha3":"stp","name":"Sao Tome and Principe"},
    {"id":682,"alpha2":"sa","alpha3":"sau","name":"Saudi Arabia"},
    {"id":686,"alpha2":"sn","alpha3":"sen","name":"Senegal"},
    {"id":688,"alpha2":"rs","alpha3":"srb","name":"Serbia"},
    {"id":690,"alpha2":"sc","alpha3":"syc","name":"Seychelles"},
    {"id":694,"alpha2":"sl","alpha3":"sle","name":"Sierra Leone"},
    {"id":702,"alpha2":"sg","alpha3":"sgp","name":"Singapore"},
    {"id":703,"alpha2":"sk","alpha3":"svk","name":"Slovakia"},
    {"id":705,"alpha2":"si","alpha3":"svn","name":"Slovenia"},
    {"id":90,"alpha2":"sb","alpha3":"slb","name":"Solomon Islands"},
    {"id":706,"alpha2":"so","alpha3":"som","name":"Somalia"},
    {"id":710,"alpha2":"za","alpha3":"zaf","name":"South Africa"},
    {"id":728,"alpha2":"ss","alpha3":"ssd","name":"South Sudan"},
    {"id":724,"alpha2":"es","alpha3":"esp","name":"Spain"},
    {"id":144,"alpha2":"lk","alpha3":"lka","name":"Sri Lanka"},
    {"id":729,"alpha2":"sd","alpha3":"sdn","name":"Sudan"},
    {"id":740,"alpha2":"sr","alpha3":"sur","name":"Suriname"},
    {"id":752,"alpha2":"se","alpha3":"swe","name":"Sweden"},
    {"id":756,"alpha2":"ch","alpha3":"che","name":"Switzerland"},
    {"id":760,"alpha2":"sy","alpha3":"syr","name":"Syrian Arab Republic"},
    {"id":762,"alpha2":"tj","alpha3":"tjk","name":"Tajikistan"},
    {"id":834,"alpha2":"tz","alpha3":"tza","name":"Tanzania, United Republic of"},
    {"id":764,"alpha2":"th","alpha3":"tha","name":"Thailand"},
    {"id":626,"alpha2":"tl","alpha3":"tls","name":"Timor-Leste"},
    {"id":768,"alpha2":"tg","alpha3":"tgo","name":"Togo"},
    {"id":776,"alpha2":"to","alpha3":"ton","name":"Tonga"},
    {"id":780,"alpha2":"tt","alpha3":"tto","name":"Trinidad and Tobago"},
    {"id":788,"alpha2":"tn","alpha3":"tun","name":"Tunisia"},
    {"id":792,"alpha2":"tr","alpha3":"tur","name":"Turkey"},
    {"id":795,"alpha2":"tm","alpha3":"tkm","name":"Turkmenistan"},
    {"id":798,"alpha2":"tv","alpha3":"tuv","name":"Tuvalu"},
    {"id":800,"alpha2":"ug","alpha3":"uga","name":"Uganda"},
    {"id":804,"alpha2":"ua","alpha3":"ukr","name":"Ukraine"},
    {"id":784,"alpha2":"ae","alpha3":"are","name":"United Arab Emirates"},
    {"id":826,"alpha2":"gb","alpha3":"gbr","name":"United Kingdom of Great Britain and Northern Ireland"},
    {"id":840,"alpha2":"us","alpha3":"usa","name":"United States of America"},
    {"id":858,"alpha2":"uy","alpha3":"ury","name":"Uruguay"},
    {"id":860,"alpha2":"uz","alpha3":"uzb","name":"Uzbekistan"},
    {"id":548,"alpha2":"vu","alpha3":"vut","name":"Vanuatu"},
    {"id":862,"alpha2":"ve","alpha3":"ven","name":"Venezuela (Bolivarian Republic of)"},
    {"id":704,"alpha2":"vn","alpha3":"vnm","name":"Viet Nam"},
    {"id":887,"alpha2":"ye","alpha3":"yem","name":"Yemen"},
    {"id":894,"alpha2":"zm","alpha3":"zmb","name":"Zambia"},
    {"id":716,"alpha2":"zw","alpha3":"zwe","name":"Zimbabwe"}]
}