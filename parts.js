const guards = 'https://www.whatproswear.com/baseball/ronald-acuna-jr/protective/ronald-acuna-jr-s-nike-diamond-batters-elbow-and-leg-guard/';
const jewelry = 'https://www.gq.com/story/mlb-playoffs-sick-jewelry';
export const parts = [
  {
    id:'helmet', name:'Batting helmet', item:'Rawlings batting helmet', category:'protection', color:'#213454',
    note:'Navy batting helmet with an extended jaw guard.',
    specs:[['Brand','Rawlings'],['Face guard','Mach EXT'],['Finish','Navy gloss']],
    evidence:'Historical reporting identifies a Rawlings Mach EXT face guard. The exact shell model is not established.',
    sources:[{label:'Helmet reference',url:'https://www.whatproswear.com/baseball/news/top-5-players-to-watch-cardinals-vs-braves-acuna-donaldson-molina-flaherty-wong/'}]
  },
  {
    id:'gloves', name:'Batting gloves', item:'Nike Alpha Elite gloves', category:'protection', color:'#e5d520',
    note:'Custom yellow batting gloves with red accents.',
    specLabel:'Retail specs',
    specs:[['Palm','100% goatskin leather'],['Cuff','Triple-reinforced neoprene'],['Technology','Dri-FIT'],['Style no.','N1015442-812']],
    evidence:'Alpha Elite is the closest documented match for the yellow, pink and blue kit. The Nike link shows the current retail edition.',
    sources:[{label:'Nike Alpha Elite Acuna',url:'https://www.nike.com/t/alpha-elite-acuna-baseball-batting-gloves-xsEZmxB6/N1015442-812'},{label:'Acuña’s custom Alpha Elite gloves',url:'https://www.whatproswear.com/baseball/ronald-acuna-jr/batting-gloves/ronald-acuna-jr-s-nike-alpha-elite-batting-gloves/'}]
  },
  {
    id:'sleeve', name:'Compression sleeve', item:'Nike Pro Dri-FIT sleeve', category:'protection', color:'#e5d520',
    note:'Light compression with sweat-wicking fabric.',
    specLabel:'Retail specs',
    specs:[['Fabric','80% polyester · 14% spandex · 6% rubber'],['Construction','Flat seams · light compression'],['Style no.','N1016023-905']],
    evidence:'Nike confirms light compression, Dri-FIT fabric and flat seams for its Acuña signature sleeve. The custom sleeve’s exact style code is not established.',
    sources:[{label:'Nike Pro Dri-FIT Acuña sleeve',url:'https://www.nike.com/t/ronald-acu%C3%B1a-jr-pro-dri-fit-baseball-sleeve-TWijBVfH/N1016023-905'}]
  },
  {
    id:'elbow', name:'Elbow guard', item:'Nike Diamond elbow guard', category:'protection', color:'#e5d520',
    note:'Extended elbow protection in Acuña’s custom yellow, pink and blue colorway.',
    specLabel:'Retail specs',
    specs:[['Materials','66% polyethylene · 15% polyester · 11% EVA · 4% rubber · 4% polyurethane'],['Fit','Adjustable strap'],['Style no.','N1011801-934']],
    evidence:'The extended custom model is documented in June 2023. Nike’s linked retail Diamond guard is the standard cut, with a lightweight shell and adjustable strap.',
    sources:[{label:'Nike Diamond Acuña elbow guard',url:'https://www.nike.com/us/es/t/protector-para-codo-para-bateador-de-beisbol-nike-diamond-ronald-acuna-jr-hpj0z0'},{label:'Custom extended guard reference',url:guards}]
  },
  {
    id:'thigh', name:'Knee pad', item:'Knee protection', category:'protection', color:'#e5d520',
    note:'Strapped padding over the lead knee.',
    specs:[['Coverage','Lead knee'],['Fit','Wraparound straps']],
    evidence:'The separate upper pad has no independently confirmed product model. It remains generically labeled.',
    sources:[{label:'Supplied equipment photo',url:'assets/acuna-reference.webp'}]
  },
  {
    id:'shin', name:'Shin & foot guard', item:'Nike Diamond leg guard', category:'protection', color:'#e5d520',
    note:'A hard-shell shin guard with an adjustable strap and removable toe cover.',
    specLabel:'Retail specs',
    specs:[['Materials','51% polyethylene · 26% polyester · 15% EVA · 6% rubber · 2% polyurethane'],['Technology','Dri-FIT'],['Style no.','N1011802-934']],
    evidence:'Nike confirms these features for its right-handed Diamond Acuña guard. The custom yellow colorway is documented in June 2023.',
    sources:[{label:'Nike Diamond Acuña leg guard',url:'https://www.nike.com/t/diamond-ronald-acuna-jr-baseball-batters-leg-guard-right-handed-hitter-jL541T/N1011802-934'},{label:'Custom colorway reference',url:guards}]
  },
  {
    id:'cleats', name:'Cleats', item:'Nike Alpha Huarache Elite 4', category:'equipment', color:'#e5d520',
    note:'Custom yellow cleats with red and blue accents.',
    specLabel:'Retail specs',
    specs:[['Upper','Breathable mesh'],['Cushioning','Nike React foam'],['Traction','Two-piece metal-stud plate'],['Style no.','FD2745-100']],
    evidence:'The custom Elite 4 identification comes from June 2023 reporting. Nike’s linked retail Low model confirms the product family, not the exact cut or colorway of his pair.',
    sources:[{label:'Nike Alpha Huarache Elite 4 Low',url:'https://www.nike.com/t/alpha-huarache-elite-4-low-mens-baseball-cleats-KhWfZJ/FD2745-100'},{label:'Acuña’s custom cleats',url:'https://www.whatproswear.com/baseball/ronald-acuna-jr/cleats/ronald-acuna-jr-s-nike-alpha-huarache-elite-4-cleats/'}]
  },
  {
    id:'chain', name:'Gold rope chain', item:'Gold rope chain', category:'jewelry', color:'#b79542',
    note:'Twisted gold links, layered with his signature pendants.',
    specs:[['Metal','Yellow gold · 14K est.'],['Link style','Rope'],['Weight','~40 g (estimated)']],
    evidence:'Gold rope chains are documented in 2020. The 14K and 40 g figures are rough estimates using comparable solid rope chains, not measurements of Acuña’s jewelry. A 22-inch, 5 mm retail example weighs 42.9 g.',
    sources:[{label:'Gold chain reference',url:jewelry},{label:'Comparable rope chain',url:'https://www.thejewelrymaster.com/mens-rope-chain-22-inch-5mm-solid-14k-yellow-gold-qg1967.html'}]
  },
  {
    id:'pendant', name:'Classic 13 chain', item:'No. 13 diamond pendant', category:'jewelry', color:'#b79542',
    note:'His jersey number in gold, set with diamonds.',
    specs:[['Metal','Yellow gold · 14K est.'],['Stones','Diamonds'],['Design','Custom No. 13'],['Weight','~20 g pendant (est.)']],
    evidence:'The classic 13 is described as gold and diamond-encrusted in June 2025 reporting. The 14K and 20 g figures are rough estimates using comparable custom diamond lettering pendants, not measurements of his piece. Weight refers to the pendant alone; diamond carat total is unverified.',
    sources:[{label:'Gold and diamond pendant reference',url:'https://sports.yahoo.com/mlb/article/atlanta-braves-still-face-an-uphill-battle-but-with-ronald-acuna-jr-anything-seems-possible-181816438.html'},{label:'Classic 13 reference',url:jewelry},{label:'Comparable custom diamond pendant',url:'https://traxnyc.com/products/mens-pendants-custom-name-custom-made-diamond-name-pendant-item68230'}]
  }
];
