// ═══════════════════════════════════════════════════════════
// BRAWL ARENA v4 — Full Progression System
// ═══════════════════════════════════════════════════════════

// ── BRAWLER DEFINITIONS ──
const BRAWLERS={
  blaze:{name:'Blaze',role:'Fighter',rarity:'common',emoji:'🔥',
    hp:3200,damage:320,speed:3.2,range:220,reload:1.5,projSpeed:8,projSize:6,ammo:3,superCharge:5,
    color:'#ff6b6b',color2:'#cc5555',weaponColor:'#ff4444',
    superName:'Fire Storm',superDesc:'Launches a giant fireball dealing 800 damage',superDamage:800,superRange:300,
    gadgetName:'Heat Shield',gadgetDesc:'Gain a shield blocking 35% damage for 3s',gadgetIcon:'🛡️',
    starPowerName:'Scorching Aura',starPowerDesc:'Enemies within range take 50 damage/sec',spIcon:'🔥',
    hyperName:'Inferno Blast',hyperDesc:'Super deals 2x damage and burns area for 3s',hcIcon:'💥',
    draw:(c,x,y,s,f)=>{c.fillStyle='#ff6b6b';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#cc5555';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#ff4444';c.beginPath();c.moveTo(x-s*2,y-s*5);c.lineTo(x,y-s*7);c.lineTo(x+s*2,y-s*5);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  volt:{name:'Volt',role:'Sharpshooter',rarity:'common',emoji:'⚡',
    hp:2800,damage:400,speed:3.0,range:300,reload:1.8,projSpeed:10,projSize:5,ammo:3,superCharge:4,
    color:'#ffd700',color2:'#ccaa00',weaponColor:'#ffee44',
    superName:'Lightning Storm',superDesc:'Calls lightning in an area for 600 damage',superDamage:600,superRange:250,
    gadgetName:'Shock Trap',gadgetDesc:'Drop a trap that stuns enemies for 1.5s',gadgetIcon:'⚡',
    starPowerName:'Chain Lightning',starPowerDesc:'Attacks bounce to one nearby enemy for 30% dmg',spIcon:'🔗',
    hyperName:'Overcharge',hyperDesc:'Super chains between all enemies in range',hcIcon:'⚡',
    draw:(c,x,y,s,f)=>{c.fillStyle='#ffd700';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#ccaa00';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#ffee44';c.beginPath();c.moveTo(x-s,y-s*6);c.lineTo(x+s*.5,y-s*4);c.lineTo(x-s*.5,y-s*4);c.lineTo(x+s,y-s*2);c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  thorn:{name:'Thorn',role:'Fighter',rarity:'rare',emoji:'🌿',
    hp:3600,damage:280,speed:3.0,range:200,reload:1.4,projSpeed:7,projSize:5,ammo:3,superCharge:5,
    color:'#2ecc71',color2:'#27ae60',weaponColor:'#44ff88',
    superName:'Vine Whip',superDesc:'Throws vines that pull and damage enemies for 700',superDamage:700,superRange:250,
    gadgetName:'Vine Trap',gadgetDesc:'Create a vine zone that slows enemies 40% for 3s',gadgetIcon:'🌱',
    starPowerName:'Toxic Thorns',starPowerDesc:'Attacks poison enemies for 80 dmg over 3s',spIcon:'☠️',
    hyperName:"Nature's Wrath",hyperDesc:'Super covers 2x area and heals allies',hcIcon:'🌳',
    draw:(c,x,y,s,f)=>{c.fillStyle='#2ecc71';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#27ae60';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#44ff88';c.fillRect(x-s*4,y-s*1,s*1.5,s*3);c.fillRect(x+s*2.5,y-s*1,s*1.5,s*3);c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  frost:{name:'Frost',role:'Controller',rarity:'rare',emoji:'❄️',
    hp:3000,damage:350,speed:2.8,range:260,reload:1.6,projSpeed:8,projSize:7,ammo:3,superCharge:5,
    color:'#74b9ff',color2:'#4488cc',weaponColor:'#aaddff',
    superName:'Blizzard',superDesc:'Freezes all enemies in range for 1.5s, 500 damage',superDamage:500,superRange:200,
    gadgetName:'Ice Wall',gadgetDesc:'Create an ice barrier that blocks movement for 4s',gadgetIcon:'🧊',
    starPowerName:'Frozen Touch',starPowerDesc:'Attacks slow enemies by 25% for 1.5s',spIcon:'🥶',
    hyperName:'Absolute Zero',hyperDesc:'Super freezes for 3s and deals 2x damage',hcIcon:'❄️',
    draw:(c,x,y,s,f)=>{c.fillStyle='#74b9ff';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#4488cc';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#aaddff';c.beginPath();c.moveTo(x,y-s*7);c.lineTo(x-s*2.5,y-s*4.5);c.lineTo(x+s*2.5,y-s*4.5);c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#0066cc';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  shadow:{name:'Shadow',role:'Assassin',rarity:'epic',emoji:'🌑',
    hp:2600,damage:450,speed:3.8,range:180,reload:1.2,projSpeed:9,projSize:5,ammo:3,superCharge:4,
    color:'#6c5ce7',color2:'#4a3d9e',weaponColor:'#a388ee',
    superName:'Shadow Strike',superDesc:'Dash forward dealing 900 damage to enemies hit',superDamage:900,superRange:280,
    gadgetName:'Smoke Bomb',gadgetDesc:'Become invisible for 2s, +20% speed',gadgetIcon:'💨',
    starPowerName:'Shadow Step',starPowerDesc:'After super, become invisible for 1.5s',spIcon:'👻',
    hyperName:'Void Strike',hyperDesc:'Super teleports to target and deals 3x damage',hcIcon:'🌀',
    draw:(c,x,y,s,f)=>{c.fillStyle='#6c5ce7';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#4a3d9e';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#2d2860';c.beginPath();c.moveTo(x-s*4,y+s*2);c.lineTo(x,y+s*6);c.lineTo(x+s*4,y+s*2);c.fill();c.fillStyle='#ff4444';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.7,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.7,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.3,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.3,0,Math.PI*2);c.fill()}},
  titan:{name:'Titan',role:'Tank',rarity:'epic',emoji:'🗿',
    hp:5000,damage:250,speed:2.4,range:150,reload:1.0,projSpeed:0,projSize:0,ammo:3,superCharge:6,
    color:'#636e72',color2:'#4a5054',weaponColor:'#888',
    superName:'Titan Smash',superDesc:'Leap and slam dealing 1000 AoE damage',superDamage:1000,superRange:200,
    gadgetName:'Ground Pound',gadgetDesc:'Stun all enemies within melee range for 1s',gadgetIcon:'💪',
    starPowerName:'Iron Will',starPowerDesc:'Below 40% HP, take 25% less damage',spIcon:'🛡️',
    hyperName:'Titan Smash+',hyperDesc:'Super stuns for 2s and creates shockwave',hcIcon:'💥',
    isMelee:true,
    draw:(c,x,y,s,f)=>{c.fillStyle='#636e72';c.beginPath();c.arc(x,y-s*2,s*6,0,Math.PI*2);c.fill();c.fillStyle='#4a5054';c.fillRect(x-s*4,y-s*2,s*8,s*8);c.fillStyle='#888';c.fillRect(x-s*6,y-s*1,s*2.5,s*5);c.fillRect(x+s*3.5,y-s*1,s*2.5,s*5);c.fillStyle='#fff';c.beginPath();c.arc(x-s*2,y-s*3,s*.9,0,Math.PI*2);c.arc(x+s*2,y-s*3,s*.9,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*2,y-s*3,s*.45,0,Math.PI*2);c.arc(x+s*2,y-s*3,s*.45,0,Math.PI*2);c.fill()}},
  crow:{name:'Crow',role:'Assassin',rarity:'legendary',emoji:'🐦',
    hp:2400,damage:380,speed:3.6,range:280,reload:1.3,projSpeed:9,projSize:4,ammo:3,superCharge:4,
    color:'#2d3436',color2:'#1a1e20',weaponColor:'#74b9ff',
    superName:'Swoop',superDesc:'Fly up and rain poison daggers for 600 total damage',superDamage:600,superRange:300,
    gadgetName:'Toxic Cloud',gadgetDesc:'Drop a poison cloud dealing 400 damage over 3s',gadgetIcon:'☁️',
    starPowerName:'Carrion Crow',starPowerDesc:'Deal 20% extra damage to poisoned enemies',spIcon:'🐦‍⬛',
    hyperName:'Toxic Fury',hyperDesc:'Super poisons entire landing area for 5s',hcIcon:'☠️',
    draw:(c,x,y,s,f)=>{c.fillStyle='#2d3436';c.beginPath();c.arc(x,y-s*2,s*4.5,0,Math.PI*2);c.fill();c.fillStyle='#1a1e20';c.fillRect(x-s*3,y-s*2,s*6,s*6);c.fillStyle='#ffd700';c.beginPath();c.moveTo(x-s,y-s*2);c.lineTo(x,y-s*0.5);c.lineTo(x+s,y-s*2);c.fill();c.fillStyle='#2d3436';c.beginPath();c.moveTo(x-s*4,y-s*1);c.lineTo(x-s*7,y-s*4);c.lineTo(x-s*3,y-s*2);c.fill();c.beginPath();c.moveTo(x+s*4,y-s*1);c.lineTo(x+s*7,y-s*4);c.lineTo(x+s*3,y-s*2);c.fill();c.fillStyle='#ff4444';c.beginPath();c.arc(x-s*1.3,y-s*3.5,s*.6,0,Math.PI*2);c.arc(x+s*1.3,y-s*3.5,s*.6,0,Math.PI*2);c.fill()}},
  rosa:{name:'Rosa',role:'Tank',rarity:'common',emoji:'🌹',
    hp:4800,damage:300,speed:2.6,range:140,reload:0.9,projSpeed:0,projSize:0,ammo:3,superCharge:6,
    color:'#e056a0',color2:'#b84080',weaponColor:'#ff88cc',isMelee:true,
    superName:'Strong Stuff',superDesc:'Gain 70% damage reduction for 3s',superDamage:0,superRange:0,
    gadgetName:'Grow Light',gadgetDesc:'Create a healing zone that restores 300 HP/s for 3s',gadgetIcon:'🌱',
    starPowerName:'Plant Life',starPowerDesc:'Heal 200 HP/s while in bushes',spIcon:'🌿',
    hyperName:'Thorny Shield',hyperDesc:'Super also reflects 30% damage back to attackers',hcIcon:'🌹',
    draw:(c,x,y,s,f)=>{c.fillStyle='#e056a0';c.beginPath();c.arc(x,y-s*2,s*5.5,0,Math.PI*2);c.fill();c.fillStyle='#b84080';c.fillRect(x-s*3.5,y-s*2,s*7,s*8);c.fillStyle='#ff88cc';c.beginPath();c.arc(x,y-s*6,s*2,0,Math.PI*2);c.fill();c.fillStyle='#44cc44';c.fillRect(x-s*5.5,y-s*1,s*2,s*5);c.fillRect(x+s*3.5,y-s*1,s*2,s*5);c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  colt:{name:'Colt',role:'Sharpshooter',rarity:'rare',emoji:'🤠',
    hp:2800,damage:360,speed:3.2,range:320,reload:1.7,projSpeed:11,projSize:4,ammo:3,superCharge:5,
    color:'#e17055',color2:'#c0553e',weaponColor:'#ffd700',burstCount:3,burstDelay:80,
    superName:'Bullet Storm',superDesc:'Fire a barrage of 6 bullets dealing 1200 total',superDamage:1200,superRange:350,
    gadgetName:'Speed Loader',gadgetDesc:'Instantly reload all ammo',gadgetIcon:'🔄',
    starPowerName:'Slick Boots',starPowerDesc:'+12% movement speed permanently',spIcon:'👢',
    hyperName:'Bullet Rain',hyperDesc:'Super fires in a wide spread covering huge area',hcIcon:'🔫',
    draw:(c,x,y,s,f)=>{c.fillStyle='#e17055';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#c0553e';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#8B4513';c.beginPath();c.ellipse(x,y-s*6.5,s*4,s*1.5,0,0,Math.PI*2);c.fill();c.fillRect(x-s*2.5,y-s*6.5,s*5,s*2);c.fillStyle='#ffd700';c.fillRect(x+s*3,y,s*4,s*1.2);c.fillRect(x-s*7,y,s*4,s*1.2);c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}},
  poco:{name:'Poco',role:'Support',rarity:'epic',emoji:'🎵',
    hp:3800,damage:200,speed:2.8,range:240,reload:1.3,projSpeed:7,projSize:8,ammo:3,superCharge:5,
    color:'#a29bfe',color2:'#7c73d4',weaponColor:'#ddd6fe',piercing:true,
    superName:'Encore',superDesc:'Heal all allies in range for 1200 HP',superDamage:-1200,superRange:250,
    gadgetName:'Tuning Fork',gadgetDesc:'Heal yourself for 500 HP instantly',gadgetIcon:'🎶',
    starPowerName:'Da Capo',starPowerDesc:'Attacks heal nearby allies for 100 HP',spIcon:'🎵',
    hyperName:'Grand Finale',hyperDesc:'Super heals 2x and grants 2s damage shield',hcIcon:'🎼',
    draw:(c,x,y,s,f)=>{c.fillStyle='#a29bfe';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#7c73d4';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#ddd6fe';c.beginPath();c.arc(x,y-s*6,s*2.5,0,Math.PI,true);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#222';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill();c.fillStyle='#ffd700';c.font=`${s*3}px serif`;c.fillText('♪',x+s*3,y-s*5)}},
  barley:{name:'Barley',role:'Thrower',rarity:'rare',emoji:'🧪',
    hp:2600,damage:300,speed:2.8,range:280,reload:1.8,projSpeed:6,projSize:6,ammo:3,superCharge:5,
    color:'#00b894',color2:'#008060',weaponColor:'#55efc4',isLob:true,aoeRadius:40,aoeDuration:2,
    superName:'Last Call',superDesc:'Throw 5 bottles in a spread dealing 1500 total',superDamage:1500,superRange:300,
    gadgetName:'Sticky Puddle',gadgetDesc:'Create a large slow zone lasting 4s',gadgetIcon:'🫧',
    starPowerName:'Medical Use',starPowerDesc:'Standing in own AoE heals 200 HP/s',spIcon:'💊',
    hyperName:'Toxic Overflow',hyperDesc:'Super covers 3x area and lasts twice as long',hcIcon:'☣️',
    draw:(c,x,y,s,f)=>{c.fillStyle='#00b894';c.beginPath();c.arc(x,y-s*2,s*4.5,0,Math.PI*2);c.fill();c.fillStyle='#008060';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#55efc4';c.beginPath();c.moveTo(x-s*2,y-s*5);c.lineTo(x-s,y-s*7);c.lineTo(x+s,y-s*7);c.lineTo(x+s*2,y-s*5);c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.3,y-s*3,s*.7,0,Math.PI*2);c.arc(x+s*1.3,y-s*3,s*.7,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x-s*1.3,y-s*3,s*.35,0,Math.PI*2);c.arc(x+s*1.3,y-s*3,s*.35,0,Math.PI*2);c.fill()}},
  surge:{name:'Surge',role:'Fighter',rarity:'legendary',emoji:'⚡',
    hp:3000,damage:420,speed:3.0,range:240,reload:1.6,projSpeed:9,projSize:6,ammo:3,superCharge:4,
    color:'#00cec9',color2:'#009e99',weaponColor:'#81ecec',
    superName:'Power Surge',superDesc:'Teleport forward and upgrade, dealing 500 damage',superDamage:500,superRange:250,
    gadgetName:'Power Shield',gadgetDesc:'Gain a shield absorbing 500 damage for 3s',gadgetIcon:'🔋',
    starPowerName:'To The Max',starPowerDesc:'Projectiles split at max range into 2',spIcon:'📈',
    hyperName:'Overclocked',hyperDesc:'Super upgrades twice and stuns enemies hit',hcIcon:'⚡',
    draw:(c,x,y,s,f)=>{c.fillStyle='#00cec9';c.beginPath();c.arc(x,y-s*2,s*5,0,Math.PI*2);c.fill();c.fillStyle='#009e99';c.fillRect(x-s*3,y-s*2,s*6,s*7);c.fillStyle='#81ecec';c.fillRect(x-s*1,y-s*6,s*2,s*3);c.fillStyle='#ffd700';c.beginPath();c.moveTo(x,y-s*4);c.lineTo(x+s*1.5,y-s*2);c.lineTo(x-s*1.5,y-s*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.8,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.8,0,Math.PI*2);c.fill();c.fillStyle='#0066ff';c.beginPath();c.arc(x-s*1.5,y-s*3,s*.4,0,Math.PI*2);c.arc(x+s*1.5,y-s*3,s*.4,0,Math.PI*2);c.fill()}}
};
const BRAWLER_IDS=Object.keys(BRAWLERS);
const RARITY_COLORS={common:'#888',rare:'#0984e3',epic:'#6c5ce7',legendary:'#fdcb6e'};

// ── UPGRADE COSTS: [powerPoints, coins] per level ──
const UPGRADE_COSTS=[
  null, // level 1 (base)
  [20,20],[30,35],[50,75],[80,140],[130,290],[210,480],[340,800],[550,1250],[890,1875],[1440,2800]
];
const GADGET_COST=1000;
const STAR_POWER_COST=2000;
const GEAR_COST=1500;
const HYPER_COST=5000;

// ── GEAR DEFINITIONS ──
const GEARS={
  damage:{name:'Damage Gear',desc:'+20% damage when below 50% HP',icon:'⚔️'},
  speed:{name:'Speed Gear',desc:'+20% speed in bushes',icon:'💨'},
  shield:{name:'Shield Gear',desc:'Spawn with 15% HP shield',icon:'🛡️'},
  health:{name:'Health Gear',desc:'2x passive healing rate',icon:'💗'}
};
const GEAR_IDS=Object.keys(GEARS);

// ── TROPHY ROAD ──
const TROPHY_ROAD=[
  {req:0,reward:{type:'brawler',id:'blaze'},icon:'🔥',desc:'Unlock Blaze'},
  {req:30,reward:{type:'coins',amount:100},icon:'🪙',desc:'100 Coins'},
  {req:60,reward:{type:'pack',packType:'common',amount:1},icon:'📦',desc:'Common Pack'},
  {req:100,reward:{type:'brawler',id:'volt'},icon:'⚡',desc:'Unlock Volt'},
  {req:150,reward:{type:'coins',amount:200},icon:'🪙',desc:'200 Coins'},
  {req:200,reward:{type:'pack',packType:'rare',amount:1},icon:'📦',desc:'Rare Pack'},
  {req:300,reward:{type:'brawler',id:'thorn'},icon:'🌿',desc:'Unlock Thorn'},
  {req:400,reward:{type:'coins',amount:400},icon:'🪙',desc:'400 Coins'},
  {req:500,reward:{type:'pack',packType:'epic',amount:1},icon:'📦',desc:'Epic Pack'},
  {req:600,reward:{type:'brawler',id:'frost'},icon:'❄️',desc:'Unlock Frost'},
  {req:750,reward:{type:'coins',amount:600},icon:'🪙',desc:'600 Coins'},
  {req:900,reward:{type:'pack',packType:'rare',amount:2},icon:'📦',desc:'Rare Pack x2'},
  {req:1000,reward:{type:'brawler',id:'shadow'},icon:'🌑',desc:'Unlock Shadow'},
  {req:1200,reward:{type:'coins',amount:1000},icon:'🪙',desc:'1000 Coins'},
  {req:1500,reward:{type:'brawler',id:'titan'},icon:'🗿',desc:'Unlock Titan'},
  {req:1800,reward:{type:'pack',packType:'epic',amount:2},icon:'📦',desc:'Epic Pack x2'},
  {req:2000,reward:{type:'brawler',id:'crow'},icon:'🐦',desc:'Unlock Crow'},
  {req:2500,reward:{type:'pack',packType:'legendary',amount:1},icon:'📦',desc:'Legendary Pack'},
  {req:3000,reward:{type:'brawler',id:'rosa'},icon:'🌹',desc:'Unlock Rosa'},
  {req:3500,reward:{type:'brawler',id:'colt'},icon:'🤠',desc:'Unlock Colt'},
  {req:4000,reward:{type:'pack',packType:'legendary',amount:2},icon:'📦',desc:'Legendary Pack x2'},
  {req:4500,reward:{type:'brawler',id:'poco'},icon:'🎵',desc:'Unlock Poco'},
  {req:5000,reward:{type:'brawler',id:'barley'},icon:'🧪',desc:'Unlock Barley'},
  {req:6000,reward:{type:'pack',packType:'mega',amount:1},icon:'🎁',desc:'Mega Pack'},
  {req:7500,reward:{type:'brawler',id:'surge'},icon:'⚡',desc:'Unlock Surge'},
  {req:10000,reward:{type:'pack',packType:'mega',amount:3},icon:'🎁',desc:'Mega Pack x3'}
];

// ── PACK DEFINITIONS ──
const PACK_TYPES={
  common:{name:'Common Pack',icon:'📦',color:'#888',glowColor:'rgba(180,180,180,.5)',
    pool:[{type:'coins',min:50,max:150,weight:40},{type:'pp',min:10,max:40,weight:40},{type:'gadget',weight:5},{type:'brawler',weight:2}]},
  rare:{name:'Rare Pack',icon:'📦',color:'#0984e3',glowColor:'rgba(9,132,227,.5)',
    pool:[{type:'coins',min:100,max:300,weight:30},{type:'pp',min:30,max:80,weight:30},{type:'gadget',weight:15},{type:'starPower',weight:8},{type:'brawler',weight:5}]},
  epic:{name:'Epic Pack',icon:'📦',color:'#6c5ce7',glowColor:'rgba(108,92,231,.5)',
    pool:[{type:'coins',min:200,max:500,weight:25},{type:'pp',min:50,max:120,weight:20},{type:'gadget',weight:20},{type:'starPower',weight:18},{type:'gear',weight:10},{type:'brawler',weight:7}]},
  legendary:{name:'Legendary Pack',icon:'🎁',color:'#fdcb6e',glowColor:'rgba(253,203,110,.5)',
    pool:[{type:'coins',min:400,max:800,weight:20},{type:'pp',min:80,max:200,weight:15},{type:'gadget',weight:15},{type:'starPower',weight:20},{type:'gear',weight:15},{type:'hyperCharge',weight:8},{type:'brawler',weight:7}]},
  mega:{name:'Mega Pack',icon:'🎁',color:'#ff6b6b',glowColor:'rgba(255,107,107,.5)',
    pool:[{type:'coins',min:600,max:1500,weight:15},{type:'pp',min:100,max:300,weight:10},{type:'gadget',weight:15},{type:'starPower',weight:20},{type:'gear',weight:18},{type:'hyperCharge',weight:15},{type:'brawler',weight:10}]}
};
const PACK_ITEMS_COUNT={common:3,rare:4,epic:4,legendary:5,mega:6};

// ── MAP CONSTANTS ──
const TILE=40,WALL=1,BUSH=2,CRATE=3,WATER=4;

// ═══════════════════════════════════════════════════════════
// SAVE SYSTEM
// ═══════════════════════════════════════════════════════════
class SaveManager{
  constructor(){this.data=this.load()}
  getDefault(){
    const b={};
    BRAWLER_IDS.forEach(id=>{b[id]={unlocked:id==='blaze',trophies:0,powerLevel:1,powerPoints:0,gadget:false,starPower:false,gears:[],hyperCharge:false}});
    return{coins:200,highestTrophies:0,packs:{common:1,rare:0,epic:0,legendary:0,mega:0},claimedRoad:[0],brawlers:b,settings:{sfx:true},totalGamesPlayed:0}
  }
  load(){try{const d=JSON.parse(localStorage.getItem('brawlArenaV4'));if(d&&d.brawlers)return d}catch(e){}return this.getDefault()}
  save(){localStorage.setItem('brawlArenaV4',JSON.stringify(this.data))}
  get coins(){return this.data.coins}
  set coins(v){this.data.coins=Math.max(0,v);this.save()}
  get totalTrophies(){return BRAWLER_IDS.reduce((sum,id)=>sum+(this.data.brawlers[id]?.trophies||0),0)}
  get highestTrophies(){return Math.max(this.data.highestTrophies||0,this.totalTrophies)}
  updateHighest(){this.data.highestTrophies=this.highestTrophies;this.save()}
  getBrawler(id){return this.data.brawlers[id]}
  unlockBrawler(id){if(this.data.brawlers[id])this.data.brawlers[id].unlocked=true;this.save()}
  getUnlockedIds(){return BRAWLER_IDS.filter(id=>this.data.brawlers[id]?.unlocked)}
  addPack(type,count=1){this.data.packs[type]=(this.data.packs[type]||0)+count;this.save()}
  usePack(type){if(this.data.packs[type]>0){this.data.packs[type]--;this.save();return true}return false}
  totalPacks(){return Object.values(this.data.packs).reduce((a,b)=>a+b,0)}
  claimRoad(idx){if(!this.data.claimedRoad.includes(idx)){this.data.claimedRoad.push(idx);this.save()}}
  isRoadClaimed(idx){return this.data.claimedRoad.includes(idx)}
  addPowerPoints(id,pp){if(this.data.brawlers[id])this.data.brawlers[id].powerPoints+=pp;this.save()}
  upgradeBrawler(id){
    const b=this.data.brawlers[id];if(!b||b.powerLevel>=11)return false;
    const cost=UPGRADE_COSTS[b.powerLevel];if(!cost)return false;
    if(b.powerPoints>=cost[0]&&this.data.coins>=cost[1]){
      b.powerPoints-=cost[0];this.data.coins-=cost[1];b.powerLevel++;this.save();return true}
    return false
  }
  buyGadget(id){const b=this.data.brawlers[id];if(b&&!b.gadget&&b.powerLevel>=7&&this.data.coins>=GADGET_COST){b.gadget=true;this.data.coins-=GADGET_COST;this.save();return true}return false}
  buyStarPower(id){const b=this.data.brawlers[id];if(b&&!b.starPower&&b.powerLevel>=9&&this.data.coins>=STAR_POWER_COST){b.starPower=true;this.data.coins-=STAR_POWER_COST;this.save();return true}return false}
  buyGear(id,gearId){const b=this.data.brawlers[id];if(b&&b.powerLevel>=10&&!b.gears.includes(gearId)&&b.gears.length<2&&this.data.coins>=GEAR_COST){b.gears.push(gearId);this.data.coins-=GEAR_COST;this.save();return true}return false}
  buyHyper(id){const b=this.data.brawlers[id];if(b&&!b.hyperCharge&&b.powerLevel>=11&&this.data.coins>=HYPER_COST){b.hyperCharge=true;this.data.coins-=HYPER_COST;this.save();return true}return false}
  addTrophies(id,amount){const b=this.data.brawlers[id];if(b){b.trophies=Math.max(0,b.trophies+amount);this.updateHighest();this.save()}}
  reset(){localStorage.removeItem('brawlArenaV4');this.data=this.getDefault();this.save()}
}

// ═══════════════════════════════════════════════════════════
// SOUND SYSTEM
// ═══════════════════════════════════════════════════════════
class SoundFX{
  constructor(){this.ctx=null;this.enabled=true}
  init(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}
  play(type){
    if(!this.enabled)return;this.init();if(!this.ctx)return;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();
    o.connect(g);g.connect(this.ctx.destination);const t=this.ctx.currentTime;
    switch(type){
      case'shoot':o.frequency.setValueAtTime(600,t);o.frequency.exponentialRampToValueAtTime(200,t+.1);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.1);o.start(t);o.stop(t+.1);break;
      case'hit':o.frequency.setValueAtTime(200,t);o.frequency.exponentialRampToValueAtTime(100,t+.15);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.start(t);o.stop(t+.15);break;
      case'kill':o.frequency.setValueAtTime(800,t);o.frequency.exponentialRampToValueAtTime(1200,t+.1);o.frequency.exponentialRampToValueAtTime(600,t+.25);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.start(t);o.stop(t+.25);break;
      case'coin':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.exponentialRampToValueAtTime(1760,t+.08);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.1);o.start(t);o.stop(t+.1);break;
      case'powerup':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.08);o.frequency.setValueAtTime(784,t+.16);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.start(t);o.stop(t+.3);break;
      case'super':o.type='sawtooth';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(900,t+.2);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.start(t);o.stop(t+.25);break;
      case'packOpen':o.type='sine';o.frequency.setValueAtTime(400,t);o.frequency.exponentialRampToValueAtTime(1200,t+.3);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.001,t+.4);o.start(t);o.stop(t+.4);break;
      case'reveal':o.type='sine';o.frequency.setValueAtTime(600,t);o.frequency.setValueAtTime(900,t+.1);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.start(t);o.stop(t+.2);break;
      case'legendary':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.15);o.frequency.setValueAtTime(784,t+.3);o.frequency.setValueAtTime(1047,t+.45);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.001,t+.6);o.start(t);o.stop(t+.6);break;
      case'gadget':o.type='square';o.frequency.setValueAtTime(400,t);o.frequency.exponentialRampToValueAtTime(800,t+.15);g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.start(t);o.stop(t+.2);break;
      case'click':o.frequency.setValueAtTime(800,t);g.gain.setValueAtTime(.06,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);o.start(t);o.stop(t+.05);break;
      default:o.frequency.setValueAtTime(440,t);g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.001,t+.1);o.start(t);o.stop(t+.1)
    }
  }
}

// ═══════════════════════════════════════════════════════════
// CHARACTER RENDERER
// ═══════════════════════════════════════════════════════════
class CharRenderer{
  drawToCanvas(canvas,brawlerId,size=50){
    const ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);
    const def=BRAWLERS[brawlerId];if(!def)return;
    const s=size/50;const cx=w/2,cy=h/2+s*2;
    ctx.save();def.draw(ctx,cx,cy,s,0);ctx.restore()
  }
  drawOnGame(ctx,brawlerId,x,y,size,facing){
    const def=BRAWLERS[brawlerId];if(!def)return;
    const s=size/50;
    ctx.save();def.draw(ctx,x,y,s,facing);ctx.restore()
  }
}

// ═══════════════════════════════════════════════════════════
// PACK OPENING SYSTEM
// ═══════════════════════════════════════════════════════════
class PackOpener{
  constructor(app){
    this.app=app;this.canvas=null;this.ctx=null;
    this.particles=[];this.phase='idle';this.packType=null;
    this.items=[];this.currentItem=0;this.timer=0;this.shakeIntensity=0;
    this.packY=0;this.packScale=0;this.glowAlpha=0;this.burstProgress=0;
    this.animFrame=null
  }
  generateItems(packType){
    const def=PACK_TYPES[packType];if(!def)return[];
    const count=PACK_ITEMS_COUNT[packType]||3;
    const items=[];const save=this.app.save;
    const unlocked=save.getUnlockedIds();
    const totalWeight=def.pool.reduce((s,p)=>s+p.weight,0);
    for(let i=0;i<count;i++){
      let roll=Math.random()*totalWeight,pick=def.pool[0];
      for(const p of def.pool){roll-=p.weight;if(roll<=0){pick=p;break}}
      switch(pick.type){
        case'coins':{const amt=Math.floor(pick.min+Math.random()*(pick.max-pick.min));items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'common'});break}
        case'pp':{const amt=Math.floor(pick.min+Math.random()*(pick.max-pick.min));
          const targets=unlocked.length?unlocked:[BRAWLER_IDS[0]];
          const target=targets[Math.floor(Math.random()*targets.length)];
          items.push({type:'pp',amount:amt,targetId:target,icon:'⬆️',name:`${amt} Power Points`,desc:BRAWLERS[target].name,rarity:'common'});break}
        case'gadget':{
          const eligible=unlocked.filter(id=>{const b=save.getBrawler(id);return b&&b.powerLevel>=7&&!b.gadget});
          if(eligible.length){const id=eligible[Math.floor(Math.random()*eligible.length)];
            items.push({type:'gadget',targetId:id,icon:BRAWLERS[id].gadgetIcon,name:BRAWLERS[id].gadgetName,desc:BRAWLERS[id].name,rarity:'epic'})}
          else{const amt=Math.floor(200+Math.random()*300);items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'common'})}
          break}
        case'starPower':{
          const eligible=unlocked.filter(id=>{const b=save.getBrawler(id);return b&&b.powerLevel>=9&&!b.starPower});
          if(eligible.length){const id=eligible[Math.floor(Math.random()*eligible.length)];
            items.push({type:'starPower',targetId:id,icon:BRAWLERS[id].spIcon,name:BRAWLERS[id].starPowerName,desc:BRAWLERS[id].name,rarity:'legendary'})}
          else{const amt=Math.floor(300+Math.random()*400);items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'common'})}
          break}
        case'gear':{
          const eligible=unlocked.filter(id=>{const b=save.getBrawler(id);return b&&b.powerLevel>=10&&b.gears.length<2});
          if(eligible.length){const id=eligible[Math.floor(Math.random()*eligible.length)];
            const b=save.getBrawler(id);const avail=GEAR_IDS.filter(g=>!b.gears.includes(g));
            const gearId=avail[Math.floor(Math.random()*avail.length)];
            items.push({type:'gear',targetId:id,gearId,icon:GEARS[gearId].icon,name:GEARS[gearId].name,desc:BRAWLERS[id].name,rarity:'epic'})}
          else{const amt=Math.floor(250+Math.random()*350);items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'common'})}
          break}
        case'hyperCharge':{
          const eligible=unlocked.filter(id=>{const b=save.getBrawler(id);return b&&b.powerLevel>=11&&!b.hyperCharge});
          if(eligible.length){const id=eligible[Math.floor(Math.random()*eligible.length)];
            items.push({type:'hyperCharge',targetId:id,icon:BRAWLERS[id].hcIcon,name:BRAWLERS[id].hyperName,desc:BRAWLERS[id].name,rarity:'mega'})}
          else{const amt=Math.floor(500+Math.random()*500);items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'rare'})}
          break}
        case'brawler':{
          const locked=BRAWLER_IDS.filter(id=>!save.data.brawlers[id]?.unlocked);
          if(locked.length){const id=locked[Math.floor(Math.random()*locked.length)];
            items.push({type:'brawler',targetId:id,icon:BRAWLERS[id].emoji,name:BRAWLERS[id].name,desc:'NEW BRAWLER!',rarity:'legendary'})}
          else{const amt=Math.floor(400+Math.random()*600);items.push({type:'coins',amount:amt,icon:'🪙',name:`${amt} Coins`,rarity:'rare'})}
          break}
      }
    }
    return items
  }
  applyItem(item){
    const save=this.app.save;
    switch(item.type){
      case'coins':save.coins+=item.amount;break;
      case'pp':save.addPowerPoints(item.targetId,item.amount);break;
      case'gadget':if(item.targetId){const b=save.getBrawler(item.targetId);if(b)b.gadget=true;save.save()}break;
      case'starPower':if(item.targetId){const b=save.getBrawler(item.targetId);if(b)b.starPower=true;save.save()}break;
      case'gear':if(item.targetId&&item.gearId){const b=save.getBrawler(item.targetId);if(b&&!b.gears.includes(item.gearId))b.gears.push(item.gearId);save.save()}break;
      case'hyperCharge':if(item.targetId){const b=save.getBrawler(item.targetId);if(b)b.hyperCharge=true;save.save()}break;
      case'brawler':if(item.targetId)save.unlockBrawler(item.targetId);break
    }
  }
  open(packType){
    this.packType=packType;
    this.items=this.generateItems(packType);
    this.currentItem=0;this.phase='enter';this.timer=0;
    this.packY=-100;this.packScale=0;this.glowAlpha=0;this.burstProgress=0;
    this.particles=[];this.shakeIntensity=0;
    this.canvas=document.getElementById('packCanvas');
    this.canvas.width=this.canvas.offsetWidth*window.devicePixelRatio;
    this.canvas.height=this.canvas.offsetHeight*window.devicePixelRatio;
    this.ctx=this.canvas.getContext('2d');
    this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
    document.getElementById('packRevealArea').innerHTML='';
    document.getElementById('packSummary').style.display='none';
    this.app.showScreen('packOpenScreen');
    const tap=()=>{
      if(this.phase==='waiting'){this.phase='shake';this.timer=0;this.canvas.removeEventListener('click',tap)}
      else if(this.phase==='reveal'){this.advanceReveal()}
    };
    this.canvas.addEventListener('click',tap);
    this.canvas._tap=tap;
    if(this.animFrame)cancelAnimationFrame(this.animFrame);
    this.animate()
  }
  animate(){
    const w=this.canvas.offsetWidth,h=this.canvas.offsetHeight;
    const ctx=this.ctx;const dt=1/60;this.timer+=dt;
    ctx.clearRect(0,0,w,h);
    // Background
    ctx.fillStyle='#050510';ctx.fillRect(0,0,w,h);
    // Draw particles
    this.particles=this.particles.filter(p=>{
      p.x+=p.vx;p.y+=p.vy;p.life-=dt;p.vy+=p.gravity||0;
      if(p.life<=0)return false;
      const a=Math.min(1,p.life/p.maxLife);
      ctx.globalAlpha=a;ctx.fillStyle=p.color;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size*a,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;return true
    });
    const cx=w/2,cy=h/2;
    const def=PACK_TYPES[this.packType];
    if(this.phase==='enter'){
      this.packY+=(cy-40-this.packY)*.08;this.packScale+=(1-this.packScale)*.08;
      if(this.timer>1){this.phase='waiting';this.timer=0}
      this.drawPack(ctx,cx,this.packY,this.packScale,def);
    }else if(this.phase==='waiting'){
      this.glowAlpha=.3+Math.sin(this.timer*3)*.2;
      this.drawPack(ctx,cx,cy-40,1,def);
      // Ambient particles
      if(Math.random()<.15)this.particles.push({x:cx+((Math.random()-.5)*120),y:cy+40,vx:(Math.random()-.5)*1,vy:-Math.random()*2-1,size:Math.random()*3+1,life:1.5,maxLife:1.5,color:def.color,gravity:0});
      ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
      ctx.fillText('TAP TO OPEN',cx,cy+80);
    }else if(this.phase==='shake'){
      this.shakeIntensity=Math.min(12,this.timer*20);
      const sx=(Math.random()-.5)*this.shakeIntensity;const sy=(Math.random()-.5)*this.shakeIntensity;
      this.drawPack(ctx,cx+sx,cy-40+sy,1+Math.sin(this.timer*40)*.03,def);
      // Crack particles
      if(Math.random()<.3)this.particles.push({x:cx+((Math.random()-.5)*60),y:cy-40+((Math.random()-.5)*60),vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,size:Math.random()*2+1,life:.5,maxLife:.5,color:'#fff',gravity:0});
      if(this.timer>0.8){this.phase='burst';this.timer=0;this.app.sound.play('packOpen');
        for(let i=0;i<60;i++){const a=Math.random()*Math.PI*2;const sp=Math.random()*8+3;
          this.particles.push({x:cx,y:cy-40,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,size:Math.random()*4+2,life:1.2,maxLife:1.2,color:Math.random()>.5?def.color:'#fff',gravity:.1})}}
    }else if(this.phase==='burst'){
      // Flash
      if(this.timer<.3){const a=1-this.timer/.3;ctx.fillStyle=`rgba(255,255,255,${a*.6})`;ctx.fillRect(0,0,w,h)}
      if(this.timer>0.6){this.phase='reveal';this.timer=0;this.advanceReveal()}
    }else if(this.phase==='reveal'){
      // Just particles in background
    }else if(this.phase==='done'){
      this.showSummary();
      if(this.animFrame){cancelAnimationFrame(this.animFrame);this.animFrame=null}
      return
    }
    this.animFrame=requestAnimationFrame(()=>this.animate())
  }
  drawPack(ctx,x,y,scale,def){
    ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
    // Glow
    const grd=ctx.createRadialGradient(0,0,20,0,0,80);
    grd.addColorStop(0,def.glowColor);grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd;ctx.fillRect(-80,-80,160,160);
    // Box
    ctx.fillStyle=def.color;
    ctx.beginPath();ctx.roundRect(-40,-45,80,90,12);ctx.fill();
    // Ribbon
    ctx.fillStyle='rgba(255,255,255,.2)';ctx.fillRect(-5,-45,10,90);ctx.fillRect(-40,-5,80,10);
    // Icon
    ctx.font='36px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(def.icon,0,0);
    // Shine
    ctx.fillStyle='rgba(255,255,255,.1)';ctx.beginPath();ctx.moveTo(-40,-45);ctx.lineTo(0,-45);ctx.lineTo(-40,0);ctx.closePath();ctx.fill();
    ctx.restore()
  }
  advanceReveal(){
    if(this.currentItem>=this.items.length){this.phase='done';return}
    const item=this.items[this.currentItem];
    this.applyItem(item);this.currentItem++;
    const area=document.getElementById('packRevealArea');
    area.innerHTML='';
    const rarityClass='reveal-rarity-'+(item.rarity||'common');
    const card=document.createElement('div');
    card.className=`pack-reveal-card ${rarityClass}`;
    card.innerHTML=`<div class="reveal-icon">${item.icon}</div>
      <div class="reveal-label">${item.rarity?.toUpperCase()||'COMMON'}</div>
      <div class="reveal-name">${item.name}</div>
      ${item.desc?`<div class="reveal-desc">${item.desc}</div>`:''}
      ${item.amount?`<div class="reveal-desc">+${item.amount}</div>`:''}`;
    area.appendChild(card);
    requestAnimationFrame(()=>{card.classList.add('show')});
    // Sound based on rarity
    const snd=item.rarity==='legendary'||item.rarity==='mega'?'legendary':item.rarity==='epic'?'powerup':'reveal';
    this.app.sound.play(snd);
    // Auto-advance after delay
    clearTimeout(this._autoAdvance);
    this._autoAdvance=setTimeout(()=>{if(this.phase==='reveal')this.advanceReveal()},1800)
  }
  showSummary(){
    clearTimeout(this._autoAdvance);
    document.getElementById('packRevealArea').innerHTML='';
    const summary=document.getElementById('packSummary');
    const itemsDiv=document.getElementById('packSummaryItems');
    itemsDiv.innerHTML=this.items.map(it=>`<div class="summary-item"><div class="summary-item-icon">${it.icon}</div><div class="summary-item-text">${it.name}</div></div>`).join('');
    summary.style.display='flex';
    document.getElementById('packDoneBtn').onclick=()=>{
      summary.style.display='none';
      if(this.canvas._tap)this.canvas.removeEventListener('click',this.canvas._tap);
      this.app.showScreen('packsScreen');
      this.app.ui.refreshPacks()
    }
  }
  destroy(){if(this.animFrame){cancelAnimationFrame(this.animFrame);this.animFrame=null}clearTimeout(this._autoAdvance)}
}

// ═══════════════════════════════════════════════════════════
// UI MANAGER
// ═══════════════════════════════════════════════════════════
class UIManager{
  constructor(app){
    this.app=app;this.selectedBrawler='blaze';this.detailBrawler=null;
    this.menuCanvas=document.getElementById('menuBgCanvas');
    this.menuParticles=[];this.menuAnimFrame=null;
    this.setupNav();this.setupMenu();this.animateMenu()
  }
  setupNav(){
    document.querySelectorAll('.back-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen(btn.dataset.to);this.refreshAll()})
    });
    document.getElementById('playBtn').addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen('selectScreen');this.refreshSelect()});
    document.getElementById('brawlersNavBtn').addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen('brawlersScreen');this.refreshBrawlerGrid()});
    document.getElementById('trophyRoadNavBtn').addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen('trophyRoadScreen');this.refreshTrophyRoad()});
    document.getElementById('packsNavBtn').addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen('packsScreen');this.refreshPacks()});
    document.getElementById('fightBtn').addEventListener('click',()=>{this.app.sound.play('click');this.app.showScreen('modeScreen')});
    document.querySelectorAll('.mode-card').forEach(card=>{
      card.addEventListener('click',()=>{this.app.sound.play('click');this.app.startGame(card.dataset.mode,this.selectedBrawler)})
    })
  }
  refreshAll(){this.refreshMenu()}
  refreshMenu(){
    document.getElementById('menuTotalTrophies').textContent=this.app.save.totalTrophies;
    document.getElementById('menuCoinCount').textContent=this.app.save.coins;
    const tp=this.app.save.totalPacks();
    const badge=document.getElementById('packBadge');
    if(tp>0){badge.style.display='inline';badge.textContent=tp}else badge.style.display='none'
  }
  setupMenu(){this.refreshMenu()}
  animateMenu(){
    const c=this.menuCanvas;if(!c)return;
    c.width=c.offsetWidth*(window.devicePixelRatio||1);
    c.height=c.offsetHeight*(window.devicePixelRatio||1);
    const ctx=c.getContext('2d');
    ctx.scale(window.devicePixelRatio||1,window.devicePixelRatio||1);
    const w=c.offsetWidth,h=c.offsetHeight;
    const animate=()=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,w,h);
      // Stars
      if(Math.random()<.1)this.menuParticles.push({x:Math.random()*w,y:Math.random()*h,s:Math.random()*2+.5,a:Math.random(),d:Math.random()>.5?1:-1});
      this.menuParticles=this.menuParticles.filter(p=>{
        p.a+=p.d*.005;if(p.a<=0||p.a>=1)p.d*=-1;
        ctx.globalAlpha=Math.abs(p.a)*.5;ctx.fillStyle='#fff';
        ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill();
        return this.menuParticles.length<80||Math.random()>.01
      });
      ctx.globalAlpha=1;
      this.menuAnimFrame=requestAnimationFrame(animate)
    };
    animate()
  }

  // ── TROPHY ROAD ──
  refreshTrophyRoad(){
    const container=document.getElementById('trophyRoadContent');
    const trophies=this.app.save.totalTrophies;
    const highest=this.app.save.highestTrophies;
    document.querySelector('.trTrophies').textContent=trophies;
    container.innerHTML='';
    TROPHY_ROAD.forEach((node,idx)=>{
      const claimed=this.app.save.isRoadClaimed(idx);
      const canClaim=!claimed&&highest>=node.req;
      const locked=highest<node.req;
      // Connector
      if(idx>0){const conn=document.createElement('div');
        conn.className='road-connector'+(claimed?' claimed':canClaim?' active':'');
        container.appendChild(conn)}
      const el=document.createElement('div');el.className='road-node';
      const stateClass=claimed?'claimed':canClaim?'available':'locked';
      const rewardClass=node.reward.type==='brawler'?'brawler-reward':'';
      el.innerHTML=`<div class="road-node-circle ${stateClass}">${node.icon}</div>
        <div class="road-node-info">
          <div class="road-node-req">🏆 ${node.req} Trophies</div>
          <div class="road-node-reward ${rewardClass}">${node.desc}</div>
        </div>
        ${claimed?'<span class="road-claimed-check">✅</span>':
          canClaim?'<button class="road-claim-btn" data-idx="'+idx+'">CLAIM</button>':''}`;
      container.appendChild(el)
    });
    container.querySelectorAll('.road-claim-btn').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        const idx=parseInt(btn.dataset.idx);
        this.claimRoadReward(idx)
      })
    })
  }
  claimRoadReward(idx){
    const node=TROPHY_ROAD[idx];if(!node)return;
    this.app.save.claimRoad(idx);
    const r=node.reward;
    switch(r.type){
      case'brawler':this.app.save.unlockBrawler(r.id);this.app.sound.play('legendary');break;
      case'coins':this.app.save.coins+=r.amount;this.app.sound.play('coin');break;
      case'pack':this.app.save.addPack(r.packType,r.amount||1);this.app.sound.play('powerup');break
    }
    this.refreshTrophyRoad();this.refreshMenu()
  }

  // ── PACKS SCREEN ──
  refreshPacks(){
    document.querySelector('.pCoins').textContent=this.app.save.coins;
    const grid=document.getElementById('packsGrid');grid.innerHTML='';
    Object.entries(PACK_TYPES).forEach(([type,def])=>{
      const count=this.app.save.data.packs[type]||0;
      const card=document.createElement('div');
      card.className=`pack-card pack-rarity-${type} ${count>0?'has-packs':''}`;
      card.innerHTML=`<div class="pack-icon">${def.icon}</div>
        <div class="pack-name">${def.name}</div>
        <div class="pack-count ${count>0?'has':''}">×${count}</div>
        ${count>0?'<button class="pack-open-btn" data-type="'+type+'">OPEN</button>':''}`;
      grid.appendChild(card)
    });
    grid.querySelectorAll('.pack-open-btn').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        const type=btn.dataset.type;
        if(this.app.save.usePack(type)){this.app.packOpener.open(type)}
      })
    });
    this.refreshMenu()
  }

  // ── BRAWLER COLLECTION ──
  refreshBrawlerGrid(){
    const grid=document.getElementById('brawlerGrid');grid.innerHTML='';
    const unlocked=this.app.save.getUnlockedIds();
    document.getElementById('unlockedCount').textContent=unlocked.length;
    BRAWLER_IDS.forEach(id=>{
      const def=BRAWLERS[id];const bData=this.app.save.getBrawler(id);
      const isUnlocked=bData?.unlocked;
      const card=document.createElement('div');
      card.className=`brawler-card ${isUnlocked?'unlocked':'locked'}`;
      const cvs=document.createElement('canvas');cvs.width=60;cvs.height=60;
      card.appendChild(cvs);
      if(isUnlocked)this.app.renderer.drawToCanvas(cvs,id,40);
      const rarityBar=document.createElement('div');
      rarityBar.className=`brawler-card-rarity rarity-${def.rarity}`;card.appendChild(rarityBar);
      card.innerHTML+=`<div class="brawler-card-name">${def.name}</div>
        ${isUnlocked?`<div class="brawler-card-info">
          <span class="brawler-card-trophies">🏆${bData.trophies}</span>
          <span class="brawler-card-power">⚡${bData.powerLevel}</span>
        </div>`:''}`;
      if(isUnlocked){
        card.addEventListener('click',()=>{this.app.sound.play('click');this.openBrawlerDetail(id)})
      }
      grid.appendChild(card)
    })
  }

  // ── BRAWLER DETAIL / UPGRADE ──
  openBrawlerDetail(id){
    this.detailBrawler=id;
    this.app.showScreen('brawlerDetailScreen');
    this.refreshBrawlerDetail()
  }
  refreshBrawlerDetail(){
    const id=this.detailBrawler;if(!id)return;
    const def=BRAWLERS[id];const bData=this.app.save.getBrawler(id);
    document.getElementById('detailBrawlerName').textContent=`${def.emoji} ${def.name}`;
    document.querySelector('.dCoins').textContent=this.app.save.coins;
    const content=document.getElementById('brawlerDetailContent');
    // Power scaling
    const pl=bData.powerLevel;
    const hpScaled=Math.floor(def.hp*(1+(pl-1)*.08));
    const dmgScaled=Math.floor(def.damage*(1+(pl-1)*.08));
    // Stat percentages (for bars)
    const hpPct=Math.min(100,hpScaled/6000*100);
    const dmgPct=Math.min(100,dmgScaled/600*100);
    const spdPct=def.speed/4*100;
    const rngPct=def.range/350*100;
    // Level up info
    const canUpgrade=pl<11;
    const nextCost=canUpgrade?UPGRADE_COSTS[pl]:null;
    const hasResources=nextCost?bData.powerPoints>=nextCost[0]&&this.app.save.coins>=nextCost[1]:false;
    const ppProgress=nextCost?Math.min(100,(bData.powerPoints/nextCost[0])*100):100;
    content.innerHTML=`
      <div class="detail-portrait"><canvas id="detailCanvas" width="100" height="100"></canvas></div>
      <div class="detail-stats">
        <div class="detail-stat-row"><span class="detail-stat-label">HP</span><div class="detail-stat-bar"><div class="detail-stat-fill" style="width:${hpPct}%;background:linear-gradient(90deg,#4ecdc4,#2ecc71)"></div></div><span class="detail-stat-val">${hpScaled}</span></div>
        <div class="detail-stat-row"><span class="detail-stat-label">DMG</span><div class="detail-stat-bar"><div class="detail-stat-fill" style="width:${dmgPct}%;background:linear-gradient(90deg,#ff6b6b,#e74c3c)"></div></div><span class="detail-stat-val">${dmgScaled}</span></div>
        <div class="detail-stat-row"><span class="detail-stat-label">SPEED</span><div class="detail-stat-bar"><div class="detail-stat-fill" style="width:${spdPct}%;background:linear-gradient(90deg,#ffd700,#f39c12)"></div></div><span class="detail-stat-val">${def.speed.toFixed(1)}</span></div>
        <div class="detail-stat-row"><span class="detail-stat-label">RANGE</span><div class="detail-stat-bar"><div class="detail-stat-fill" style="width:${rngPct}%;background:linear-gradient(90deg,#74b9ff,#0984e3)"></div></div><span class="detail-stat-val">${def.range}</span></div>
      </div>
      <div class="detail-level-section">
        <div class="detail-level-title">⚡ POWER ${pl}${pl>=11?' (MAX)':''}</div>
        ${canUpgrade?`
        <div class="detail-level-bar"><div class="detail-level-fill" style="width:${ppProgress}%"></div>
          <div class="detail-level-text">${bData.powerPoints}/${nextCost[0]} PP</div></div>
        <div class="detail-pp-info">Upgrade cost: ${nextCost[0]} PP + ${nextCost[1]} 🪙</div>
        <button class="btn btn-upgrade" id="upgradeBtn" ${hasResources?'':'disabled'}>UPGRADE ⬆️</button>`
        :`<div class="detail-pp-info" style="color:#4ecdc4">MAX LEVEL REACHED!</div>`}
      </div>
      <div class="section-title" style="margin-top:8px;font-size:.9em">ABILITIES</div>
      <div class="detail-upgrade-section">
        ${this.renderUpgradeSlot(id,'gadget',def.gadgetIcon,def.gadgetName,def.gadgetDesc,7,bData.gadget,bData.powerLevel,GADGET_COST)}
        ${this.renderUpgradeSlot(id,'starPower',def.spIcon,def.starPowerName,def.starPowerDesc,9,bData.starPower,bData.powerLevel,STAR_POWER_COST)}
        ${this.renderGearSlots(id,bData)}
        ${this.renderUpgradeSlot(id,'hyperCharge',def.hcIcon,def.hyperName,def.hyperDesc,11,bData.hyperCharge,bData.powerLevel,HYPER_COST,'full-width')}
      </div>
      <div style="margin-top:12px;text-align:center">
        <div style="font-size:.75em;color:#888">🏆 ${bData.trophies} Trophies</div>
      </div>`;
    // Draw portrait
    setTimeout(()=>{const cvs=document.getElementById('detailCanvas');if(cvs)this.app.renderer.drawToCanvas(cvs,id,70)},50);
    // Upgrade button
    const upBtn=document.getElementById('upgradeBtn');
    if(upBtn)upBtn.addEventListener('click',()=>{
      if(this.app.save.upgradeBrawler(id)){this.app.sound.play('powerup');this.refreshBrawlerDetail()}
    });
    // Ability buy buttons
    content.querySelectorAll('.buy-ability-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const aType=btn.dataset.type;const aId=btn.dataset.id;const gId=btn.dataset.gearid;
        let success=false;
        if(aType==='gadget')success=this.app.save.buyGadget(aId);
        else if(aType==='starPower')success=this.app.save.buyStarPower(aId);
        else if(aType==='gear')success=this.app.save.buyGear(aId,gId);
        else if(aType==='hyperCharge')success=this.app.save.buyHyper(aId);
        if(success){this.app.sound.play('powerup');this.refreshBrawlerDetail()}
      })
    })
  }
  renderUpgradeSlot(bId,type,icon,name,desc,reqLevel,owned,currentLevel,cost,extraClass=''){
    const canBuy=!owned&&currentLevel>=reqLevel&&this.app.save.coins>=cost;
    const state=owned?'unlocked':currentLevel>=reqLevel?'unlockable':'locked';
    return`<div class="upgrade-slot ${state} ${extraClass}">
      <div class="upgrade-slot-icon">${icon}</div>
      <div class="upgrade-slot-name">${name}</div>
      <div class="upgrade-slot-desc">${desc}</div>
      ${owned?'<div class="upgrade-slot-req" style="color:#4ecdc4">✅ EQUIPPED</div>':
        currentLevel>=reqLevel?`<div class="upgrade-slot-cost">${cost} 🪙</div><button class="btn btn-unlock btn-small buy-ability-btn" data-type="${type}" data-id="${bId}" ${canBuy?'':'disabled'}>BUY</button>`:
        `<div class="upgrade-slot-req">🔒 Requires Power ${reqLevel}</div>`}
    </div>`
  }
  renderGearSlots(bId,bData){
    if(bData.powerLevel<10)return`<div class="upgrade-slot locked"><div class="upgrade-slot-icon">⚙️</div><div class="upgrade-slot-name">Gear Slot 1</div><div class="upgrade-slot-req">🔒 Requires Power 10</div></div>
      <div class="upgrade-slot locked"><div class="upgrade-slot-icon">⚙️</div><div class="upgrade-slot-name">Gear Slot 2</div><div class="upgrade-slot-req">🔒 Requires Power 10</div></div>`;
    let html='';
    for(let i=0;i<2;i++){
      if(bData.gears[i]){
        const g=GEARS[bData.gears[i]];
        html+=`<div class="upgrade-slot unlocked"><div class="upgrade-slot-icon">${g.icon}</div><div class="upgrade-slot-name">${g.name}</div><div class="upgrade-slot-desc">${g.desc}</div><div class="upgrade-slot-req" style="color:#4ecdc4">✅ EQUIPPED</div></div>`
      }else{
        const available=GEAR_IDS.filter(g=>!bData.gears.includes(g));
        if(available.length){
          const g=GEARS[available[0]];
          html+=`<div class="upgrade-slot unlockable"><div class="upgrade-slot-icon">⚙️</div><div class="upgrade-slot-name">Gear Slot ${i+1}</div>
            <div class="upgrade-slot-desc">Choose a gear</div>
            ${available.map(gId=>`<button class="btn btn-unlock btn-small buy-ability-btn" data-type="gear" data-id="${bId}" data-gearid="${gId}" style="margin:3px" ${this.app.save.coins>=GEAR_COST?'':'disabled'}>${GEARS[gId].icon} ${GEARS[gId].name} (${GEAR_COST}🪙)</button>`).join('')}
          </div>`
        }else{
          html+=`<div class="upgrade-slot locked"><div class="upgrade-slot-icon">⚙️</div><div class="upgrade-slot-name">No Gears Left</div></div>`
        }
      }
    }
    return html
  }

  // ── CHARACTER SELECT ──
  refreshSelect(){
    const grid=document.getElementById('selectGrid');grid.innerHTML='';
    const unlocked=this.app.save.getUnlockedIds();
    if(!unlocked.includes(this.selectedBrawler))this.selectedBrawler=unlocked[0]||'blaze';
    unlocked.forEach(id=>{
      const def=BRAWLERS[id];const bData=this.app.save.getBrawler(id);
      const card=document.createElement('div');
      card.className=`char-card ${id===this.selectedBrawler?'selected':''}`;
      const cvs=document.createElement('canvas');cvs.width=50;cvs.height=50;
      card.appendChild(cvs);
      this.app.renderer.drawToCanvas(cvs,id,35);
      card.innerHTML+=`<div class="char-name">${def.name}</div><div class="char-role">${def.role} ⚡${bData.powerLevel}</div>`;
      card.addEventListener('click',()=>{
        this.app.sound.play('click');this.selectedBrawler=id;
        grid.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');this.updateSelectInfo()
      });
      grid.appendChild(card)
    });
    this.updateSelectInfo()
  }
  updateSelectInfo(){
    const id=this.selectedBrawler;const def=BRAWLERS[id];const bData=this.app.save.getBrawler(id);
    const pl=bData.powerLevel;
    const hp=Math.floor(def.hp*(1+(pl-1)*.08));
    const dmg=Math.floor(def.damage*(1+(pl-1)*.08));
    const panel=document.getElementById('selectInfo');
    panel.innerHTML=`<div style="font-size:.85em;font-weight:700;color:#ffd700;margin-bottom:6px">${def.emoji} ${def.name} <span style="color:#4ecdc4">⚡${pl}</span> <span style="color:#888;font-size:.8em">🏆${bData.trophies}</span></div>
      <div class="stat-bar"><span class="stat-label">HP</span><div class="stat-fill-bg"><div class="stat-fill" style="width:${hp/6000*100}%;background:#4ecdc4"></div></div></div>
      <div class="stat-bar"><span class="stat-label">DMG</span><div class="stat-fill-bg"><div class="stat-fill" style="width:${dmg/600*100}%;background:#ff6b6b"></div></div></div>
      <div class="stat-bar"><span class="stat-label">SPD</span><div class="stat-fill-bg"><div class="stat-fill" style="width:${def.speed/4*100}%;background:#ffd700"></div></div></div>
      <div style="font-size:.6em;color:#888;margin-top:6px;display:flex;gap:8px;flex-wrap:wrap">
        ${bData.gadget?`<span style="color:#4ecdc4">${def.gadgetIcon} ${def.gadgetName}</span>`:''}
        ${bData.starPower?`<span style="color:#ffd700">${def.spIcon} ${def.starPowerName}</span>`:''}
        ${bData.gears.map(g=>`<span style="color:#a0a0c0">${GEARS[g].icon} ${GEARS[g].name}</span>`).join('')}
        ${bData.hyperCharge?`<span style="color:#ff6b6b">${def.hcIcon} HYPER</span>`:''}
      </div>`
  }
} // end UIManager

// ═══════════════════════════════════════════════════════════
// GAME ENGINE
// ═══════════════════════════════════════════════════════════
class BrawlGame{
  constructor(app,mode,brawlerId){
    this.app=app;this.mode=mode;this.brawlerId=brawlerId;
    this.canvas=document.getElementById('gameCanvas');
    this.ctx=this.canvas.getContext('2d');
    this.W=0;this.H=0;this.resize();
    this.mapW=0;this.mapH=0;this.tiles=[];this.entities=[];
    this.projectiles=[];this.effects=[];this.coins=[];this.aoeZones=[];
    this.players=[];this.player=null;this.alive=0;
    this.camera={x:0,y:0};
    this.moveStick={active:false,id:null,sx:0,sy:0,cx:0,cy:0,dx:0,dy:0};
    this.aimStick={active:false,id:null,sx:0,sy:0,cx:0,cy:0,dx:0,dy:0,tapStart:0};
    this.poisonRadius=9999;this.poisonCenter={x:0,y:0};this.poisonTimer=0;this.poisonShrinkStart=50;
    this.gameTime=0;this.gameOver=false;this.playerRank=0;this.killCount=0;this.damageDealt=0;
    this.matchCoins=0;this.inGamePower=1;
    this.setupInput();this.generateMap();this.spawnPlayers();
    this.running=true;this.lastTime=performance.now();this.loop()
  }
  resize(){
    const dpr=window.devicePixelRatio||1;
    this.W=this.canvas.offsetWidth;this.H=this.canvas.offsetHeight;
    this.canvas.width=this.W*dpr;this.canvas.height=this.H*dpr;
    this.ctx.setTransform(dpr,0,0,dpr,0,0)
  }
  generateMap(){
    const cols=50,rows=50;this.mapW=cols*TILE;this.mapH=rows*TILE;
    this.tiles=Array.from({length:rows},()=>Array(cols).fill(0));
    this.poisonCenter={x:this.mapW/2,y:this.mapH/2};
    this.poisonRadius=Math.hypot(this.mapW,this.mapH)/2+100;
    // Walls around edges
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      if(r===0||r===rows-1||c===0||c===cols-1){this.tiles[r][c]=WALL;continue}
      // Random structures
      const rx=Math.random();
      if(rx<.04)this.tiles[r][c]=WALL;
      else if(rx<.12)this.tiles[r][c]=BUSH;
      else if(rx<.17)this.tiles[r][c]=CRATE;
      else if(rx<.185)this.tiles[r][c]=WATER;
    }
    // Create some wall clusters for cover
    for(let i=0;i<25;i++){
      const cr=5+Math.floor(Math.random()*(rows-10));
      const cc=5+Math.floor(Math.random()*(cols-10));
      const shape=Math.floor(Math.random()*3);
      if(shape===0){for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(cr+dr>0&&cr+dr<rows-1&&cc+dc>0&&cc+dc<cols-1)this.tiles[cr+dr][cc+dc]=WALL}}
      else if(shape===1){for(let d=-2;d<=2;d++){if(cr>0&&cr<rows-1&&cc+d>0&&cc+d<cols-1)this.tiles[cr][cc+d]=WALL}}
      else{for(let d=-2;d<=2;d++){if(cr+d>0&&cr+d<rows-1&&cc>0&&cc<cols-1)this.tiles[cr+d][cc]=WALL}}
    }
    // Bush clusters
    for(let i=0;i<20;i++){
      const cr=3+Math.floor(Math.random()*(rows-6));
      const cc=3+Math.floor(Math.random()*(cols-6));
      for(let dr=-2;dr<=2;dr++)for(let dc=-2;dc<=2;dc++){
        if(Math.random()<.6&&cr+dr>0&&cr+dr<rows-1&&cc+dc>0&&cc+dc<cols-1&&this.tiles[cr+dr][cc+dc]===0)
          this.tiles[cr+dr][cc+dc]=BUSH
      }
    }
    // Crate clusters
    for(let i=0;i<15;i++){
      const cr=3+Math.floor(Math.random()*(rows-6));
      const cc=3+Math.floor(Math.random()*(cols-6));
      for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
        if(Math.random()<.5&&cr+dr>0&&cr+dr<rows-1&&cc+dc>0&&cc+dc<cols-1&&this.tiles[cr+dr][cc+dc]===0)
          this.tiles[cr+dr][cc+dc]=CRATE
      }
    }
  }
  findSpawn(attempts=100){
    for(let i=0;i<attempts;i++){
      const x=100+Math.random()*(this.mapW-200);
      const y=100+Math.random()*(this.mapH-200);
      const c=Math.floor(x/TILE),r=Math.floor(y/TILE);
      if(this.tiles[r]&&this.tiles[r][c]===0){
        let tooClose=this.players.some(p=>Math.hypot(p.x-x,p.y-y)<200);
        if(!tooClose)return{x,y}
      }
    }
    return{x:this.mapW/2,y:this.mapH/2}
  }
  spawnPlayers(){
    const playerCount=this.mode==='duoShowdown'?10:10;
    const bData=this.app.save.getBrawler(this.brawlerId);
    const pl=bData?bData.powerLevel:1;
    // Spawn player
    const sp=this.findSpawn();
    const def=BRAWLERS[this.brawlerId];
    this.player=this.createPlayer(sp.x,sp.y,this.brawlerId,false,pl,bData);
    this.player.name='You';
    this.players.push(this.player);
    // Spawn AI
    const aiIds=BRAWLER_IDS.filter(id=>id!==this.brawlerId);
    for(let i=1;i<playerCount;i++){
      const asp=this.findSpawn();
      const aiId=aiIds[i%aiIds.length];
      const aiPl=Math.max(1,pl+Math.floor(Math.random()*3)-1);
      this.players.push(this.createPlayer(asp.x,asp.y,aiId,true,aiPl,null))
    }
    this.alive=this.players.length
  }
  createPlayer(x,y,brawlerId,isAI,powerLevel,saveData){
    const def=BRAWLERS[brawlerId];
    const pl=powerLevel;const mult=1+(pl-1)*.08;
    const maxHp=Math.floor(def.hp*mult);
    const dmg=Math.floor(def.damage*mult);
    return{
      x,y,brawlerId,def,isAI,powerLevel:pl,
      hp:maxHp,maxHp,damage:dmg,baseDamage:dmg,speed:def.speed,
      ammo:def.ammo,maxAmmo:def.ammo,reloadTimer:0,
      superCharge:0,superReady:false,maxSuperCharge:def.superCharge||5,
      facing:0,alive:true,inBush:false,
      coins:0,inGamePower:0,
      gadgetUses:3,hasGadget:saveData?saveData.gadget:isAI&&Math.random()<.3,
      hasStarPower:saveData?saveData.starPower:isAI&&Math.random()<.2,
      gears:saveData?saveData.gears:isAI&&Math.random()<.15?['damage']:[],
      hasHyperCharge:saveData?saveData.hyperCharge:false,
      shieldTimer:0,shieldAmount:0,invisTimer:0,slowTimer:0,slowAmount:0,
      poisonTimer:0,poisonDmg:0,healZoneTimer:0,
      damageBoost:0,speedBoost:0,damageReduction:0,
      // AI state
      aiTarget:null,aiTimer:0,aiState:'loot',aiDir:{x:0,y:0},aiWander:0,
      name:isAI?def.name:''
    }
  }

  // ── INPUT ──
  setupInput(){
    const leftZone=document.getElementById('joystickLeft');
    const rightZone=document.getElementById('joystickRight');
    const handleStart=(e,stick)=>{
      for(const t of e.changedTouches){
        if(!stick.active){stick.active=true;stick.id=t.identifier;stick.sx=t.clientX;stick.sy=t.clientY;stick.cx=t.clientX;stick.cy=t.clientY;stick.dx=0;stick.dy=0;stick.tapStart=performance.now()}
      }
    };
    const handleMove=(e,stick)=>{
      for(const t of e.changedTouches){
        if(t.identifier===stick.id){stick.cx=t.clientX;stick.cy=t.clientY;
          const dx=stick.cx-stick.sx,dy=stick.cy-stick.sy;
          const dist=Math.hypot(dx,dy);const maxD=50;
          if(dist>maxD){stick.dx=dx/dist;stick.dy=dy/dist}
          else if(dist>8){stick.dx=dx/dist;stick.dy=dy/dist}
          else{stick.dx=0;stick.dy=0}
        }
      }
    };
    const handleEnd=(e,stick,isAim)=>{
      for(const t of e.changedTouches){
        if(t.identifier===stick.id){
          if(isAim){
            const dist=Math.hypot(stick.cx-stick.sx,stick.cy-stick.sy);
            const dt=performance.now()-stick.tapStart;
            if(dist<20&&dt<300){this.autoAimShoot()}
            else if(dist>=8){this.shoot(stick.dx,stick.dy)}
          }
          stick.active=false;stick.id=null;stick.dx=0;stick.dy=0
        }
      }
    };
    leftZone.addEventListener('touchstart',e=>{e.preventDefault();handleStart(e,this.moveStick)},{passive:false});
    leftZone.addEventListener('touchmove',e=>{e.preventDefault();handleMove(e,this.moveStick)},{passive:false});
    leftZone.addEventListener('touchend',e=>{e.preventDefault();handleEnd(e,this.moveStick,false)},{passive:false});
    rightZone.addEventListener('touchstart',e=>{e.preventDefault();handleStart(e,this.aimStick)},{passive:false});
    rightZone.addEventListener('touchmove',e=>{e.preventDefault();handleMove(e,this.aimStick)},{passive:false});
    rightZone.addEventListener('touchend',e=>{e.preventDefault();handleEnd(e,this.aimStick,true)},{passive:false});
    // Mouse fallback
    let mouseDown=false;
    this.canvas.addEventListener('mousedown',e=>{mouseDown=true});
    this.canvas.addEventListener('mousemove',e=>{
      if(mouseDown&&this.player?.alive){
        const rect=this.canvas.getBoundingClientRect();
        const mx=e.clientX-rect.left,my=e.clientY-rect.top;
        const wx=mx+this.camera.x-this.W/2,wy=my+this.camera.y-this.H/2;
        const dx=wx-this.player.x,dy=wy-this.player.y;
        const d=Math.hypot(dx,dy);
        if(d>5){this.moveStick.dx=dx/d;this.moveStick.dy=dy/d}
      }
    });
    this.canvas.addEventListener('mouseup',e=>{mouseDown=false;this.moveStick.dx=0;this.moveStick.dy=0});
    this.canvas.addEventListener('click',e=>{if(this.player?.alive)this.autoAimShoot()});
    // Super button
    document.getElementById('superBtn').addEventListener('click',()=>this.playerUseSuper());
    document.getElementById('gadgetBtn').addEventListener('click',()=>this.playerUseGadget());
  }
  autoAimShoot(){
    if(!this.player||!this.player.alive)return;
    let closest=null,closestDist=this.player.def.range*1.5;
    for(const p of this.players){
      if(p===this.player||!p.alive||p.invisTimer>0)continue;
      const d=Math.hypot(p.x-this.player.x,p.y-this.player.y);
      if(d<closestDist){closestDist=d;closest=p}
    }
    if(closest){
      const dx=closest.x-this.player.x,dy=closest.y-this.player.y;
      const d=Math.hypot(dx,dy);this.shoot(dx/d,dy/d)
    }else{
      // Shoot in facing direction
      this.shoot(Math.cos(this.player.facing),Math.sin(this.player.facing))
    }
  }
  shoot(dx,dy,shooter=null){
    const p=shooter||this.player;if(!p||!p.alive||p.ammo<1)return;
    p.ammo--;p.reloadTimer=p.def.reload;
    const def=p.def;
    if(!shooter)this.app.sound.play('shoot');
    if(def.isMelee){
      // Melee attack - check nearby enemies
      for(const e of this.players){
        if(e===p||!e.alive)continue;
        const d=Math.hypot(e.x-p.x,e.y-p.y);
        if(d<def.range){this.dealDamage(p,e,p.damage)}
      }
      this.effects.push({type:'melee',x:p.x+dx*40,y:p.y+dy*40,timer:.2,color:def.weaponColor,size:def.range*.6})
    }else if(def.isLob){
      // Lobbed projectile
      const tx=p.x+dx*def.range,ty=p.y+dy*def.range;
      this.projectiles.push({x:p.x,y:p.y,tx,ty,progress:0,owner:p,damage:p.damage,speed:def.projSpeed,isLob:true,aoeRadius:def.aoeRadius||40,aoeDuration:def.aoeDuration||2,color:def.weaponColor,size:def.projSize})
    }else if(def.burstCount){
      // Burst fire
      for(let i=0;i<def.burstCount;i++){
        setTimeout(()=>{
          const spread=(Math.random()-.5)*.15;
          const bx=dx*Math.cos(spread)-dy*Math.sin(spread);
          const by=dx*Math.sin(spread)+dy*Math.cos(spread);
          this.projectiles.push({x:p.x,y:p.y,dx:bx,dy:by,owner:p,damage:Math.floor(p.damage/def.burstCount),speed:def.projSpeed,range:def.range,traveled:0,color:def.weaponColor,size:def.projSize,piercing:def.piercing})
        },i*(def.burstDelay||80))
      }
    }else{
      this.projectiles.push({x:p.x,y:p.y,dx,dy,owner:p,damage:p.damage,speed:def.projSpeed,range:def.range,traveled:0,color:def.weaponColor,size:def.projSize,piercing:def.piercing})
    }
    p.facing=Math.atan2(dy,dx)
  }
  dealDamage(attacker,target,damage){
    if(!target.alive)return;
    // Damage reduction
    if(target.damageReduction>0)damage=Math.floor(damage*(1-target.damageReduction));
    if(target.shieldTimer>0){
      const absorbed=Math.min(target.shieldAmount,damage);
      target.shieldAmount-=absorbed;damage-=absorbed;
      if(target.shieldAmount<=0)target.shieldTimer=0
    }
    // Gear: damage boost when low hp
    if(attacker.gears.includes('damage')&&attacker.hp<attacker.maxHp*.5)damage=Math.floor(damage*1.2);
    target.hp-=damage;
    if(!attacker.isAI)this.damageDealt+=damage;
    // Super charge
    attacker.superCharge+=damage/500;
    if(attacker.superCharge>=attacker.maxSuperCharge)attacker.superReady=true;
    // Star power effects
    if(attacker.hasStarPower){
      const spName=attacker.def.starPowerName;
      if(spName==='Toxic Thorns'){target.poisonTimer=3;target.poisonDmg=27}
      if(spName==='Frozen Touch'){target.slowTimer=1.5;target.slowAmount=.25}
      if(spName==='Chain Lightning'){
        let nearest=null,nd=150;
        for(const p of this.players){if(p!==target&&p!==attacker&&p.alive){const d=Math.hypot(p.x-target.x,p.y-target.y);if(d<nd){nd=d;nearest=p}}}
        if(nearest){this.dealDamage(attacker,nearest,Math.floor(damage*.3));this.effects.push({type:'lightning',x:target.x,y:target.y,tx:nearest.x,ty:nearest.y,timer:.2})}
      }
      if(spName==='Carrion Crow'&&target.poisonTimer>0)damage=Math.floor(damage*.2);
    }
    // Damage number
    this.effects.push({type:'dmgNum',x:target.x+(Math.random()-.5)*20,y:target.y-30,val:damage,timer:.8,color:attacker===this.player?'#ff6b6b':'#ffd700'});
    // Check kill
    if(target.hp<=0){
      target.hp=0;target.alive=false;this.alive--;
      // Drop coins
      const coinDrop=2+target.inGamePower+Math.floor(Math.random()*3);
      for(let i=0;i<coinDrop;i++){
        this.coins.push({x:target.x+(Math.random()-.5)*40,y:target.y+(Math.random()-.5)*40,value:1,timer:15})
      }
      if(attacker===this.player){
        this.killCount++;this.app.sound.play('kill');
        this.effects.push({type:'killText',x:target.x,y:target.y-50,text:`☠️ ${target.name||target.def.name}`,timer:1.5})
      }
      // Check game over
      if(!this.player.alive){this.playerRank=this.alive+1;this.endGame()}
      else if(this.alive<=1){this.playerRank=1;this.endGame()}
    }else{
      if(!attacker.isAI)this.app.sound.play('hit')
    }
  }
  playerUseSuper(){
    const p=this.player;if(!p||!p.alive||!p.superReady)return;
    p.superReady=false;p.superCharge=0;this.app.sound.play('super');
    this.useSuper(p)
  }
  playerUseGadget(){
    const p=this.player;if(!p||!p.alive||!p.hasGadget||p.gadgetUses<=0)return;
    p.gadgetUses--;this.app.sound.play('gadget');
    this.useGadget(p)
  }
  useSuper(p){
    const def=p.def;const hcMult=p.hasHyperCharge?2:1;
    const dmg=Math.floor((def.superDamage||0)*hcMult*(1+(p.powerLevel-1)*.08));
    const range=def.superRange||200;
    if(def.superName==='Strong Stuff'){
      // Rosa: damage reduction
      p.damageReduction=.7;setTimeout(()=>{if(p.alive)p.damageReduction=0},3000);
      this.effects.push({type:'shield',target:p,timer:3,color:'#4ecdc4'})
    }else if(def.superDamage<0){
      // Healing super (Poco)
      if(!p.isAI&&this.player)this.player.hp=Math.min(this.player.maxHp,this.player.hp+Math.abs(dmg));
      this.effects.push({type:'heal',x:p.x,y:p.y,timer:1,radius:range,color:'#a29bfe'})
    }else{
      // Damage super
      for(const e of this.players){
        if(e===p||!e.alive)continue;
        const d=Math.hypot(e.x-p.x,e.y-p.y);
        if(d<range)this.dealDamage(p,e,dmg)
      }
      this.effects.push({type:'super',x:p.x,y:p.y,timer:.6,radius:range,color:def.color})
    }
    // Star power: Shadow Step
    if(p.hasStarPower&&def.starPowerName==='Shadow Step')p.invisTimer=1.5
  }
  useGadget(p){
    const gName=p.def.gadgetName;
    switch(gName){
      case'Heat Shield':p.shieldTimer=3;p.shieldAmount=p.maxHp*.35;break;
      case'Shock Trap':this.aoeZones.push({x:p.x,y:p.y,radius:60,timer:4,type:'stun',owner:p,color:'rgba(255,215,0,.3)'});break;
      case'Vine Trap':this.aoeZones.push({x:p.x,y:p.y,radius:80,timer:3,type:'slow',slow:.4,owner:p,color:'rgba(46,204,113,.3)'});break;
      case'Ice Wall':
        const wx=p.x+Math.cos(p.facing)*60,wy=p.y+Math.sin(p.facing)*60;
        const c=Math.floor(wx/TILE),r=Math.floor(wy/TILE);
        for(let dc=-1;dc<=1;dc++){if(r>0&&r<this.tiles.length-1&&c+dc>0&&c+dc<this.tiles[0].length-1)this.tiles[r][c+dc]=WALL}
        setTimeout(()=>{for(let dc=-1;dc<=1;dc++){if(this.tiles[r]&&this.tiles[r][c+dc]===WALL)this.tiles[r][c+dc]=0}},4000);
        break;
      case'Smoke Bomb':p.invisTimer=2;p.speedBoost=.2;setTimeout(()=>{p.speedBoost=0},2000);break;
      case'Ground Pound':
        for(const e of this.players){if(e===p||!e.alive)continue;if(Math.hypot(e.x-p.x,e.y-p.y)<100){e.slowTimer=1;e.slowAmount=.8;this.dealDamage(p,e,Math.floor(p.damage*.5))}}
        this.effects.push({type:'super',x:p.x,y:p.y,timer:.4,radius:100,color:'#636e72'});break;
      case'Toxic Cloud':this.aoeZones.push({x:p.x,y:p.y,radius:70,timer:3,type:'damage',dps:130,owner:p,color:'rgba(45,52,54,.4)'});break;
      case'Grow Light':this.aoeZones.push({x:p.x,y:p.y,radius:60,timer:3,type:'heal',hps:100,owner:p,color:'rgba(225,86,160,.3)'});break;
      case'Speed Loader':p.ammo=p.maxAmmo;break;
      case'Tuning Fork':p.hp=Math.min(p.maxHp,p.hp+500);this.effects.push({type:'heal',x:p.x,y:p.y,timer:.5,radius:30,color:'#a29bfe'});break;
      case'Sticky Puddle':this.aoeZones.push({x:p.x+Math.cos(p.facing)*80,y:p.y+Math.sin(p.facing)*80,radius:70,timer:4,type:'slow',slow:.5,owner:p,color:'rgba(0,184,148,.3)'});break;
      case'Power Shield':p.shieldTimer=3;p.shieldAmount=500;break;
    }
  }

  // ── MAIN LOOP ──
  loop(){
    if(!this.running)return;
    const now=performance.now();const dt=Math.min((now-this.lastTime)/1000,.05);this.lastTime=now;
    this.update(dt);this.render();
    requestAnimationFrame(()=>this.loop())
  }
  update(dt){
    if(this.gameOver)return;
    this.gameTime+=dt;
    // Player movement
    if(this.player?.alive){
      const p=this.player;
      let spd=p.speed*(1+p.inGamePower*.04);
      if(p.slowTimer>0)spd*=(1-p.slowAmount);
      if(p.speedBoost>0)spd*=(1+p.speedBoost);
      // Gear: speed in bush
      if(p.gears.includes('speed')&&p.inBush)spd*=1.2;
      // Star power: Slick Boots
      if(p.hasStarPower&&p.def.starPowerName==='Slick Boots')spd*=1.12;
      if(this.moveStick.dx||this.moveStick.dy){
        const nx=p.x+this.moveStick.dx*spd*60*dt;
        const ny=p.y+this.moveStick.dy*spd*60*dt;
        if(!this.collides(nx,p.y,12))p.x=nx;
        if(!this.collides(p.x,ny,12))p.y=ny;
        p.facing=Math.atan2(this.moveStick.dy,this.moveStick.dx)
      }
      // Reload
      if(p.ammo<p.maxAmmo){p.reloadTimer-=dt;if(p.reloadTimer<=0){p.ammo++;p.reloadTimer=p.def.reload}}
      // Collect coins
      this.coins=this.coins.filter(c=>{
        c.timer-=dt;if(c.timer<=0)return false;
        const d=Math.hypot(c.x-p.x,c.y-p.y);
        if(d<30){
          p.coins+=c.value;this.matchCoins+=c.value;
          if(p.coins>=5){p.coins-=5;p.inGamePower=Math.min(10,p.inGamePower+1);
            p.maxHp=Math.floor(p.def.hp*(1+(p.powerLevel-1)*.08)*(1+p.inGamePower*.06));
            p.hp=Math.min(p.maxHp,p.hp+200);
            p.damage=Math.floor(p.baseDamage*(1+p.inGamePower*.06));
            this.app.sound.play('powerup');
            this.effects.push({type:'dmgNum',x:p.x,y:p.y-40,val:'POWER UP!',timer:1,color:'#ffd700'})}
          else this.app.sound.play('coin');
          return false}
        return true
      });
      // Bush check
      const tc=Math.floor(p.x/TILE),tr=Math.floor(p.y/TILE);
      p.inBush=this.tiles[tr]&&this.tiles[tr][tc]===BUSH;
      // Star power: Plant Life
      if(p.hasStarPower&&p.def.starPowerName==='Plant Life'&&p.inBush)p.hp=Math.min(p.maxHp,p.hp+200*dt);
      // Poison damage
      if(p.poisonTimer>0){p.poisonTimer-=dt;p.hp-=p.poisonDmg*dt;if(p.hp<=0){p.hp=0;p.alive=false;this.alive--;this.playerRank=this.alive+1;this.endGame()}}
      // Timers
      if(p.shieldTimer>0)p.shieldTimer-=dt;
      if(p.invisTimer>0)p.invisTimer-=dt;
      if(p.slowTimer>0)p.slowTimer-=dt;
      // Passive heal
      const healRate=p.gears.includes('health')?60:30;
      p.hp=Math.min(p.maxHp,p.hp+healRate*dt);
      // Star power: Scorching Aura
      if(p.hasStarPower&&p.def.starPowerName==='Scorching Aura'){
        for(const e of this.players){if(e!==p&&e.alive&&Math.hypot(e.x-p.x,e.y-p.y)<120){e.hp-=50*dt;if(e.hp<=0&&e.alive){e.hp=0;e.alive=false;this.alive--;if(this.alive<=1){this.playerRank=1;this.endGame()}}}}
      }
    }
    // Update AI
    this.updateAI(dt);
    // Update projectiles
    this.projectiles=this.projectiles.filter(proj=>{
      if(proj.isLob){
        proj.progress+=dt*proj.speed/100;
        if(proj.progress>=1){
          // Land - create AoE
          this.aoeZones.push({x:proj.tx,y:proj.ty,radius:proj.aoeRadius,timer:proj.aoeDuration,type:'damage',dps:proj.damage/proj.aoeDuration,owner:proj.owner,color:proj.color+'44'});
          this.effects.push({type:'super',x:proj.tx,y:proj.ty,timer:.3,radius:proj.aoeRadius,color:proj.color});
          return false}
        return true
      }
      proj.x+=proj.dx*proj.speed;proj.y+=proj.dy*proj.speed;proj.traveled+=proj.speed;
      if(proj.traveled>proj.range)return false;
      // Wall collision
      const tc=Math.floor(proj.x/TILE),tr=Math.floor(proj.y/TILE);
      if(tr>=0&&tr<this.tiles.length&&tc>=0&&tc<this.tiles[0].length){
        const tile=this.tiles[tr][tc];
        if(tile===WALL)return false;
        if(tile===CRATE){this.tiles[tr][tc]=0;
          // Drop coins from crate
          const cd=2+Math.floor(Math.random()*3);
          for(let i=0;i<cd;i++)this.coins.push({x:tc*TILE+TILE/2+(Math.random()-.5)*30,y:tr*TILE+TILE/2+(Math.random()-.5)*30,value:1,timer:20});
          // Chance for power cube
          if(Math.random()<.2)this.coins.push({x:tc*TILE+TILE/2,y:tr*TILE+TILE/2,value:5,timer:25,isPowerCube:true});
          return false}
      }else return false;
      // Player collision
      for(const p of this.players){
        if(p===proj.owner||!p.alive)continue;
        if(Math.hypot(p.x-proj.x,p.y-proj.y)<16){
          this.dealDamage(proj.owner,p,proj.damage);
          if(!proj.piercing)return false
        }
      }
      return true
    });
    // Update AoE zones
    this.aoeZones=this.aoeZones.filter(zone=>{
      zone.timer-=dt;if(zone.timer<=0)return false;
      for(const p of this.players){
        if(!p.alive)continue;
        const d=Math.hypot(p.x-zone.x,p.y-zone.y);
        if(d<zone.radius){
          if(zone.type==='damage'&&p!==zone.owner)p.hp-=zone.dps*dt;
          if(zone.type==='slow'&&p!==zone.owner){p.slowTimer=.5;p.slowAmount=zone.slow}
          if(zone.type==='stun'&&p!==zone.owner){p.slowTimer=1.5;p.slowAmount=.9}
          if(zone.type==='heal'&&p===zone.owner)p.hp=Math.min(p.maxHp,p.hp+zone.hps*dt);
          // Star power: Medical Use
          if(zone.owner&&zone.owner===p&&zone.owner.hasStarPower&&zone.owner.def.starPowerName==='Medical Use')p.hp=Math.min(p.maxHp,p.hp+200*dt);
          if(p.hp<=0&&p.alive){
            p.hp=0;p.alive=false;this.alive--;
            if(p===this.player){this.playerRank=this.alive+1;this.endGame()}
            else if(this.alive<=1&&this.player?.alive){this.playerRank=1;this.endGame()}
          }
        }
      }
      return true
    });
    // Update effects
    this.effects=this.effects.filter(e=>{e.timer-=dt;return e.timer>0});
    // Poison zone
    if(this.gameTime>this.poisonShrinkStart){
      const shrinkRate=2.5;
      this.poisonRadius=Math.max(80,this.poisonRadius-shrinkRate*dt*10);
      // Damage outside zone
      for(const p of this.players){
        if(!p.alive)continue;
        const d=Math.hypot(p.x-this.poisonCenter.x,p.y-this.poisonCenter.y);
        if(d>this.poisonRadius){
          p.hp-=150*dt;
          if(p.hp<=0&&p.alive){
            p.hp=0;p.alive=false;this.alive--;
            if(p===this.player){this.playerRank=this.alive+1;this.endGame()}
            else if(this.alive<=1&&this.player?.alive){this.playerRank=1;this.endGame()}
          }
        }
      }
    }
    // Update HUD
    this.updateHUD()
  }
  collides(x,y,r){
    const margin=r;
    const c1=Math.floor((x-margin)/TILE),c2=Math.floor((x+margin)/TILE);
    const r1=Math.floor((y-margin)/TILE),r2=Math.floor((y+margin)/TILE);
    for(let rr=r1;rr<=r2;rr++)for(let cc=c1;cc<=c2;cc++){
      if(rr<0||rr>=this.tiles.length||cc<0||cc>=this.tiles[0].length)return true;
      const t=this.tiles[rr][cc];if(t===WALL||t===CRATE||t===WATER)return true
    }
    return false
  }

  // ── AI ──
  updateAI(dt){
    const phase=this.gameTime<30?'early':this.gameTime<80?'mid':'late';
    for(const p of this.players){
      if(!p.isAI||!p.alive)continue;
      p.aiTimer-=dt;
      // Reload
      if(p.ammo<p.maxAmmo){p.reloadTimer-=dt;if(p.reloadTimer<=0){p.ammo++;p.reloadTimer=p.def.reload}}
      // Timer effects
      if(p.poisonTimer>0){p.poisonTimer-=dt;p.hp-=p.poisonDmg*dt}
      if(p.shieldTimer>0)p.shieldTimer-=dt;
      if(p.invisTimer>0)p.invisTimer-=dt;
      if(p.slowTimer>0)p.slowTimer-=dt;
      // Passive heal
      p.hp=Math.min(p.maxHp,p.hp+30*dt);
      // Collect coins
      this.coins=this.coins.filter(c=>{
        if(Math.hypot(c.x-p.x,c.y-p.y)<25){
          p.coins+=c.value;
          if(p.coins>=5){p.coins-=5;p.inGamePower=Math.min(10,p.inGamePower+1);
            p.maxHp=Math.floor(p.def.hp*(1+(p.powerLevel-1)*.08)*(1+p.inGamePower*.06));
            p.hp=Math.min(p.maxHp,p.hp+200);
            p.damage=Math.floor(p.baseDamage*(1+p.inGamePower*.06))}
          return false}
        return true
      });
      // Bush check
      const tc=Math.floor(p.x/TILE),tr=Math.floor(p.y/TILE);
      p.inBush=this.tiles[tr]&&this.tiles[tr][tc]===BUSH;
      // Star power: Plant Life  
      if(p.hasStarPower&&p.def.starPowerName==='Plant Life'&&p.inBush)p.hp=Math.min(p.maxHp,p.hp+200*dt);
      if(p.aiTimer>0){
        // Continue current action
        let spd=p.speed*(1+p.inGamePower*.04);
        if(p.slowTimer>0)spd*=(1-p.slowAmount);
        if(p.gears.includes('speed')&&p.inBush)spd*=1.2;
        if(p.hasStarPower&&p.def.starPowerName==='Slick Boots')spd*=1.12;
        const nx=p.x+p.aiDir.x*spd*60*dt;
        const ny=p.y+p.aiDir.y*spd*60*dt;
        if(!this.collides(nx,p.y,12))p.x=nx;
        if(!this.collides(p.x,ny,12))p.y=ny;
        continue
      }
      // Decide action
      p.aiTimer=.3+Math.random()*.5;
      // Find nearest enemy
      let nearestEnemy=null,neDist=Infinity;
      for(const e of this.players){
        if(e===p||!e.alive)continue;
        const d=Math.hypot(e.x-p.x,e.y-p.y);
        if(d<neDist){neDist=d;nearestEnemy=e}
      }
      // Find nearest coin
      let nearestCoin=null,ncDist=Infinity;
      for(const c of this.coins){
        const d=Math.hypot(c.x-p.x,c.y-p.y);
        if(d<ncDist){ncDist=d;nearestCoin=c}
      }
      // Find nearest crate
      let nearestCrate=null,ncrDist=Infinity;
      const rows=this.tiles.length,cols=this.tiles[0].length;
      const searchR=8;
      const pr=Math.floor(p.y/TILE),pc=Math.floor(p.x/TILE);
      for(let r=Math.max(1,pr-searchR);r<Math.min(rows-1,pr+searchR);r++){
        for(let c=Math.max(1,pc-searchR);c<Math.min(cols-1,pc+searchR);c++){
          if(this.tiles[r][c]===CRATE){
            const d=Math.hypot(c*TILE+TILE/2-p.x,r*TILE+TILE/2-p.y);
            if(d<ncrDist){ncrDist=d;nearestCrate={x:c*TILE+TILE/2,y:r*TILE+TILE/2}}}
        }
      }
      // Phase-based behavior
      if(phase==='early'){
        // Prioritize looting
        if(nearestCoin&&ncDist<200){
          const dx=nearestCoin.x-p.x,dy=nearestCoin.y-p.y;const d=Math.hypot(dx,dy);
          p.aiDir={x:dx/d,y:dy/d}
        }else if(nearestCrate&&ncrDist<300){
          const dx=nearestCrate.x-p.x,dy=nearestCrate.y-p.y;const d=Math.hypot(dx,dy);
          p.aiDir={x:dx/d,y:dy/d};
          if(ncrDist<p.def.range&&p.ammo>0){const nd=Math.hypot(dx,dy);this.shoot(dx/nd,dy/nd,p)}
        }else{
          // Wander toward center-ish
          const dx=this.poisonCenter.x+((Math.random()-.5)*400)-p.x;
          const dy=this.poisonCenter.y+((Math.random()-.5)*400)-p.y;
          const d=Math.hypot(dx,dy);p.aiDir={x:dx/d,y:dy/d}
        }
        // Only fight if very close
        if(nearestEnemy&&neDist<120&&p.ammo>0){
          const dx=nearestEnemy.x-p.x,dy=nearestEnemy.y-p.y;const d=Math.hypot(dx,dy);
          this.shoot(dx/d,dy/d,p);p.facing=Math.atan2(dy,dx)
        }
      }else if(phase==='mid'){
        // Balance loot and combat
        if(p.hp<p.maxHp*.3){
          // Flee from nearest enemy
          if(nearestEnemy&&neDist<250){
            const dx=p.x-nearestEnemy.x,dy=p.y-nearestEnemy.y;const d=Math.hypot(dx,dy);
            p.aiDir={x:dx/d,y:dy/d}
          }else{p.aiDir={x:(Math.random()-.5)*2,y:(Math.random()-.5)*2}}
          // Use gadget if available
          if(p.hasGadget&&p.gadgetUses>0&&p.hp<p.maxHp*.25)this.useGadget(p)
        }else if(nearestEnemy&&neDist<p.def.range*1.2){
          // Fight
          const dx=nearestEnemy.x-p.x,dy=nearestEnemy.y-p.y;const d=Math.hypot(dx,dy);
          if(p.ammo>0){this.shoot(dx/d,dy/d,p);p.facing=Math.atan2(dy,dx)}
          // Strafe
          p.aiDir={x:dy/d*.5+(Math.random()-.5)*.3,y:-dx/d*.5+(Math.random()-.5)*.3}
        }else if(nearestCoin&&ncDist<250){
          const dx=nearestCoin.x-p.x,dy=nearestCoin.y-p.y;const d=Math.hypot(dx,dy);
          p.aiDir={x:dx/d,y:dy/d}
        }else if(nearestCrate&&ncrDist<250){
          const dx=nearestCrate.x-p.x,dy=nearestCrate.y-p.y;const d=Math.hypot(dx,dy);
          p.aiDir={x:dx/d,y:dy/d};
          if(ncrDist<p.def.range&&p.ammo>0){this.shoot(dx/d,dy/d,p)}
        }else{
          const dx=this.poisonCenter.x-p.x,dy=this.poisonCenter.y-p.y;const d=Math.hypot(dx,dy)||1;
          p.aiDir={x:dx/d+((Math.random()-.5)*.5),y:dy/d+((Math.random()-.5)*.5)}
        }
        // Use super if ready and enemy close
        if(p.superReady&&nearestEnemy&&neDist<(p.def.superRange||200))this.useSuper(p)
      }else{
        // Late: aggressive
        if(nearestEnemy){
          const dx=nearestEnemy.x-p.x,dy=nearestEnemy.y-p.y;const d=Math.hypot(dx,dy);
          if(neDist<p.def.range&&p.ammo>0){this.shoot(dx/d,dy/d,p);p.facing=Math.atan2(dy,dx)}
          // Chase or strafe
          if(neDist>p.def.range*.8){p.aiDir={x:dx/d,y:dy/d}}
          else{p.aiDir={x:dy/d*.6,y:-dx/d*.6}}
          if(p.superReady&&neDist<(p.def.superRange||200)*1.2)this.useSuper(p);
          if(p.hasGadget&&p.gadgetUses>0&&p.hp<p.maxHp*.4)this.useGadget(p)
        }else{
          const dx=this.poisonCenter.x-p.x,dy=this.poisonCenter.y-p.y;const d=Math.hypot(dx,dy)||1;
          p.aiDir={x:dx/d,y:dy/d}
        }
      }
      // Stay inside poison
      const distFromCenter=Math.hypot(p.x-this.poisonCenter.x,p.y-this.poisonCenter.y);
      if(distFromCenter>this.poisonRadius-60){
        const dx=this.poisonCenter.x-p.x,dy=this.poisonCenter.y-p.y;const d=Math.hypot(dx,dy)||1;
        p.aiDir={x:dx/d,y:dy/d}
      }
    }
  }

  // ── HUD ──
  updateHUD(){
    const p=this.player;if(!p)return;
    document.getElementById('hudScore').textContent=`${this.alive} ALIVE`;
    document.getElementById('hudName').textContent=BRAWLERS[this.brawlerId].name;
    document.getElementById('hudPower').textContent=`⚡${p.powerLevel}+${p.inGamePower}`;
    document.getElementById('hudCoins').textContent=`🪙${this.matchCoins}`;
    const hpPct=Math.max(0,p.hp/p.maxHp*100);
    document.getElementById('hudHpBar').style.width=hpPct+'%';
    document.getElementById('hudHpText').textContent=`${Math.ceil(p.hp)}/${p.maxHp}`;
    if(hpPct<30)document.getElementById('hudHpBar').style.background='linear-gradient(90deg,#ff6b6b,#e74c3c)';
    else document.getElementById('hudHpBar').style.background='linear-gradient(90deg,#4ecdc4,#2ecc71)';
    const superPct=Math.min(100,p.superCharge/p.maxSuperCharge*100);
    document.getElementById('hudSuperBar').style.width=superPct+'%';
    const superBtn=document.getElementById('superBtn');
    if(p.superReady){superBtn.classList.add('ready');superBtn.textContent='⭐ SUPER'}
    else{superBtn.classList.remove('ready');superBtn.textContent='SUPER'}
    // Ammo pips
    const ammoEl=document.getElementById('hudAmmo');
    let ammoHtml='';
    for(let i=0;i<p.maxAmmo;i++)ammoHtml+=`<div class="hud-ammo-pip ${i<p.ammo?'full':'empty'}"></div>`;
    ammoEl.innerHTML=ammoHtml;
    // Gadget button
    const gBtn=document.getElementById('gadgetBtn');
    if(p.hasGadget){gBtn.style.display='flex';document.getElementById('gadgetUses').textContent=p.gadgetUses;
      if(p.gadgetUses<=0)gBtn.classList.add('empty');else gBtn.classList.remove('empty')}
    else gBtn.style.display='none'
  }

  // ── RENDER ──
  render(){
    const ctx=this.ctx;const w=this.W,h=this.H;
    ctx.clearRect(0,0,w,h);
    // Camera
    if(this.player)  {this.camera.x+=(this.player.x-this.camera.x)*.1;this.camera.y+=(this.player.y-this.camera.y)*.1}
    const ox=w/2-this.camera.x,oy=h/2-this.camera.y;
    ctx.save();ctx.translate(ox,oy);
    // Draw tiles
    const startC=Math.max(0,Math.floor((this.camera.x-w/2)/TILE));
    const endC=Math.min(this.tiles[0]?.length||0,Math.ceil((this.camera.x+w/2)/TILE)+1);
    const startR=Math.max(0,Math.floor((this.camera.y-h/2)/TILE));
    const endR=Math.min(this.tiles.length,Math.ceil((this.camera.y+h/2)/TILE)+1);
    for(let r=startR;r<endR;r++){
      for(let c=startC;c<endC;c++){
        const x=c*TILE,y=r*TILE;const tile=this.tiles[r][c];
        // Ground
        ctx.fillStyle=(r+c)%2===0?'#2a3a2a':'#253525';
        ctx.fillRect(x,y,TILE,TILE);
        if(tile===WALL){ctx.fillStyle='#4a4a5a';ctx.fillRect(x,y,TILE,TILE);ctx.fillStyle='#3a3a4a';ctx.fillRect(x+2,y+2,TILE-4,TILE-4)}
        else if(tile===BUSH){ctx.fillStyle='#2d5a2d';ctx.fillRect(x,y,TILE,TILE);ctx.fillStyle='#3a7a3a';ctx.fillRect(x+4,y+4,TILE-8,TILE-8)}
        else if(tile===CRATE){ctx.fillStyle='#8B6914';ctx.fillRect(x+4,y+4,TILE-8,TILE-8);ctx.fillStyle='#A0801C';ctx.fillRect(x+8,y+8,TILE-16,TILE-16);ctx.strokeStyle='#6a5010';ctx.strokeRect(x+4,y+4,TILE-8,TILE-8)}
        else if(tile===WATER){ctx.fillStyle='#1a4a8a';ctx.fillRect(x,y,TILE,TILE);ctx.fillStyle='#2060a0';ctx.fillRect(x+3,y+3,TILE-6,TILE-6)}
      }
    }
    // Poison zone visual
    if(this.gameTime>this.poisonShrinkStart-10){
      ctx.save();
      ctx.beginPath();ctx.rect(0,0,this.mapW,this.mapH);
      ctx.arc(this.poisonCenter.x,this.poisonCenter.y,this.poisonRadius,0,Math.PI*2,true);
      ctx.fillStyle='rgba(128,0,128,.25)';ctx.fill();
      // Edge glow
      ctx.beginPath();ctx.arc(this.poisonCenter.x,this.poisonCenter.y,this.poisonRadius,0,Math.PI*2);
      ctx.strokeStyle='rgba(200,0,200,.4)';ctx.lineWidth=3;ctx.stroke();
      ctx.restore()
    }
    // Draw AoE zones
    for(const z of this.aoeZones){
      ctx.beginPath();ctx.arc(z.x,z.y,z.radius,0,Math.PI*2);
      ctx.fillStyle=z.color;ctx.fill()
    }
    // Draw coins
    for(const c of this.coins){
      if(c.isPowerCube){
        ctx.fillStyle='#ff6b6b';ctx.beginPath();ctx.arc(c.x,c.y,8,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#ffd700';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('⚡',c.x,c.y)
      }else{
        ctx.fillStyle='#ffd700';ctx.beginPath();ctx.arc(c.x,c.y,5,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#fff200';ctx.beginPath();ctx.arc(c.x,c.y,3,0,Math.PI*2);ctx.fill()
      }
    }
    // Draw players
    const sorted=[...this.players].sort((a,b)=>a.y-b.y);
    for(const p of sorted){
      if(!p.alive)continue;
      // Skip invisible enemies
      if(p.invisTimer>0&&p!==this.player)continue;
      ctx.save();
      if(p.invisTimer>0&&p===this.player)ctx.globalAlpha=.4;
      // Shadow
      ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(p.x,p.y+16,14,6,0,0,Math.PI*2);ctx.fill();
      // Shield visual
      if(p.shieldTimer>0){ctx.strokeStyle='rgba(78,205,196,.6)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,22,0,Math.PI*2);ctx.stroke()}
      // Damage reduction visual
      if(p.damageReduction>0){ctx.strokeStyle='rgba(255,215,0,.4)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,24,0,Math.PI*2);ctx.stroke()}
      // Draw character
      this.app.renderer.drawOnGame(ctx,p.brawlerId,p.x,p.y,18,p.facing);
      // HP bar above
      const barW=32,barH=4,barY=p.y-28;
      ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(p.x-barW/2-1,barY-1,barW+2,barH+2);
      const hpPct=Math.max(0,p.hp/p.maxHp);
      ctx.fillStyle=hpPct>.5?'#4ecdc4':hpPct>.25?'#ffd700':'#ff6b6b';
      ctx.fillRect(p.x-barW/2,barY,barW*hpPct,barH);
      // Name
      ctx.fillStyle=p===this.player?'#ffd700':'#fff';
      ctx.font='bold 9px sans-serif';ctx.textAlign='center';
      ctx.fillText(p.name||p.def.name,p.x,p.y-33);
      // Power level badge
      if(p.inGamePower>0){
        ctx.fillStyle='#ffd700';ctx.font='bold 7px sans-serif';
        ctx.fillText(`⚡${p.inGamePower}`,p.x+20,p.y-25)
      }
      ctx.restore()
    }
    // Draw projectiles
    for(const proj of this.projectiles){
      if(proj.isLob){
        const cx=proj.x+(proj.tx-proj.x)*proj.progress;
        const cy=proj.y+(proj.ty-proj.y)*proj.progress;
        const arc=Math.sin(proj.progress*Math.PI)*40;
        ctx.fillStyle=proj.color;ctx.beginPath();ctx.arc(cx,cy-arc,proj.size,0,Math.PI*2);ctx.fill()
      }else{
        ctx.fillStyle=proj.color;ctx.beginPath();ctx.arc(proj.x,proj.y,proj.size,0,Math.PI*2);ctx.fill();
        // Trail
        ctx.fillStyle=proj.color+'66';ctx.beginPath();ctx.arc(proj.x-proj.dx*3,proj.y-proj.dy*3,proj.size*.7,0,Math.PI*2);ctx.fill()
      }
    }
    // Draw effects
    for(const e of this.effects){
      const a=Math.min(1,e.timer/(.8));
      if(e.type==='dmgNum'){
        ctx.globalAlpha=a;ctx.fillStyle=e.color;ctx.font='bold 14px sans-serif';ctx.textAlign='center';
        ctx.fillText(typeof e.val==='number'?`-${e.val}`:e.val,e.x,e.y-((1-a)*20));ctx.globalAlpha=1
      }else if(e.type==='killText'){
        ctx.globalAlpha=a;ctx.fillStyle='#ff6b6b';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
        ctx.fillText(e.text,e.x,e.y-((1-a)*20));ctx.globalAlpha=1
      }else if(e.type==='super'){
        ctx.globalAlpha=a*.4;ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,e.radius*(1-a*.3),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1
      }else if(e.type==='heal'){
        ctx.globalAlpha=a*.3;ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,e.radius*(1+a*.5),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1
      }else if(e.type==='melee'){
        ctx.globalAlpha=a*.5;ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,e.size*a,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1
      }else if(e.type==='lightning'){
        ctx.globalAlpha=a;ctx.strokeStyle='#ffd700';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(e.x,e.y);
        const mx=(e.x+e.tx)/2+(Math.random()-.5)*20,my=(e.y+e.ty)/2+(Math.random()-.5)*20;
        ctx.quadraticCurveTo(mx,my,e.tx,e.ty);ctx.stroke();ctx.globalAlpha=1
      }
    }
    // Joystick visuals
    this.drawJoystick(ctx,this.moveStick,ox,oy);
    this.drawJoystick(ctx,this.aimStick,ox,oy);
    ctx.restore();
    // Minimap
    this.drawMinimap()
  }
  drawJoystick(ctx,stick,ox,oy){
    if(!stick.active)return;
    ctx.save();ctx.setTransform(1,0,0,1,0,0);
    const dpr=window.devicePixelRatio||1;
    ctx.scale(dpr,dpr);
    // Base
    ctx.globalAlpha=.2;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(stick.sx,stick.sy,40,0,Math.PI*2);ctx.fill();
    // Knob
    const kx=stick.sx+stick.dx*30,ky=stick.sy+stick.dy*30;
    ctx.globalAlpha=.4;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(kx,ky,18,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;ctx.restore()
  }
  drawMinimap(){
    const mc=document.getElementById('minimapCanvas');if(!mc)return;
    const ctx=mc.getContext('2d');const mw=mc.width,mh=mc.height;
    ctx.clearRect(0,0,mw,mh);
    ctx.fillStyle='#1a1a2e';ctx.fillRect(0,0,mw,mh);
    const sx=mw/this.mapW,sy=mh/this.mapH;
    // Poison zone
    if(this.gameTime>this.poisonShrinkStart-10){
      ctx.beginPath();ctx.rect(0,0,mw,mh);
      ctx.arc(this.poisonCenter.x*sx,this.poisonCenter.y*sy,this.poisonRadius*sx,0,Math.PI*2,true);
      ctx.fillStyle='rgba(128,0,128,.35)';ctx.fill()
    }
    // Players
    for(const p of this.players){
      if(!p.alive)continue;
      ctx.fillStyle=p===this.player?'#4ecdc4':p.invisTimer>0?'transparent':'#ff6b6b';
      ctx.fillRect(p.x*sx-2,p.y*sy-2,4,4)
    }
    // Coins
    ctx.fillStyle='rgba(255,215,0,.5)';
    for(const c of this.coins)ctx.fillRect(c.x*sx-1,c.y*sy-1,2,2)
  }

  // ── GAME OVER ──
  endGame(){
    if(this.gameOver)return;
    this.gameOver=true;this.running=false;
    // Calculate trophy change
    const rank=this.playerRank;
    let trophyChange=0;
    if(rank===1)trophyChange=8;
    else if(rank===2)trophyChange=6;
    else if(rank===3)trophyChange=5;
    else if(rank<=5)trophyChange=3;
    else if(rank<=7)trophyChange=0;
    else trophyChange=-(rank-7)*2;
    this.app.save.addTrophies(this.brawlerId,trophyChange);
    this.app.save.data.totalGamesPlayed++;
    // Reward coins
    const coinReward=Math.max(5,20-rank*2)+this.killCount*3;
    this.app.save.coins+=coinReward;
    // Pack reward chance
    let packEarned=null;
    const totalTrophies=this.app.save.totalTrophies;
    if(rank===1&&Math.random()<.3){packEarned='rare';this.app.save.addPack('rare')}
    else if(rank<=3&&Math.random()<.2){packEarned='common';this.app.save.addPack('common')}
    else if(Math.random()<.08){packEarned='common';this.app.save.addPack('common')}
    // Check trophy road
    let newRoadRewards=[];
    TROPHY_ROAD.forEach((node,idx)=>{
      if(!this.app.save.isRoadClaimed(idx)&&this.app.save.highestTrophies>=node.req)
        newRoadRewards.push(node)
    });
    this.app.save.save();
    // Show results
    const container=document.getElementById('resultContainer');
    const rankText=rank===1?'🏆 VICTORY!':rank<=3?'🥈 GREAT JOB!':'💀 DEFEATED';
    const trophyClass=trophyChange>=0?'trophy-change-positive':'trophy-change-negative';
    const trophyStr=trophyChange>=0?`+${trophyChange}`:trophyChange;
    container.innerHTML=`
      <div class="result-title">${rankText}</div>
      <div class="result-rank">#${rank} of 10</div>
      <div class="result-stats">
        <div class="go-stat"><span>Brawler</span><span>${BRAWLERS[this.brawlerId].emoji} ${BRAWLERS[this.brawlerId].name}</span></div>
        <div class="go-stat"><span>Trophies</span><span class="${trophyClass}">${trophyStr} 🏆</span></div>
        <div class="go-stat"><span>Kills</span><span>${this.killCount} ☠️</span></div>
        <div class="go-stat"><span>Damage</span><span>${this.damageDealt.toLocaleString()}</span></div>
        <div class="go-stat"><span>Coins Collected</span><span>${this.matchCoins} 🪙</span></div>
        <div class="go-stat"><span>Coin Reward</span><span>+${coinReward} 🪙</span></div>
        <div class="go-stat"><span>Power Level</span><span>⚡${this.player?.inGamePower||0}</span></div>
      </div>
      ${packEarned?`<div class="result-pack-earned">📦 You earned a ${PACK_TYPES[packEarned].name}!</div>`:''}
      ${newRoadRewards.length?`<div class="result-pack-earned">🛣️ New Trophy Road rewards available!</div>`:''}
      <div class="result-btns">
        <button class="btn btn-primary" id="retryBtn">PLAY AGAIN</button>
        <button class="btn btn-secondary" id="menuBtn">MENU</button>
      </div>`;
    this.app.showScreen('gameOverScreen');
    document.getElementById('retryBtn').addEventListener('click',()=>{
      this.destroy();this.app.startGame(this.mode,this.brawlerId)
    });
    document.getElementById('menuBtn').addEventListener('click',()=>{
      this.destroy();this.app.showScreen('menuScreen');this.app.ui.refreshMenu()
    })
  }
  destroy(){this.running=false}
} // end BrawlGame

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
class BrawlArena{
  constructor(){
    this.save=new SaveManager();
    this.sound=new SoundFX();
    this.renderer=new CharRenderer();
    this.packOpener=new PackOpener(this);
    this.ui=new UIManager(this);
    this.game=null;
    this.currentScreen='menuScreen';
    // Draw initial menu portrait
    const portrait=document.getElementById('hudPortrait');
    if(portrait)this.renderer.drawToCanvas(portrait,'blaze',28);
    // Ensure first brawler is unlocked and road claimed
    if(!this.save.data.brawlers.blaze.unlocked){
      this.save.unlockBrawler('blaze')
    }
    if(!this.save.isRoadClaimed(0))this.save.claimRoad(0);
    this.ui.refreshMenu()
  }
  showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el=document.getElementById(id);if(el)el.classList.add('active');
    this.currentScreen=id
  }
  startGame(mode,brawlerId){
    this.showScreen('gameScreen');
    // Draw portrait
    const portrait=document.getElementById('hudPortrait');
    if(portrait)this.renderer.drawToCanvas(portrait,brawlerId,28);
    if(this.game)this.game.destroy();
    this.game=new BrawlGame(this,mode,brawlerId)
  }
}
// ── LAUNCH ──
window.addEventListener('DOMContentLoaded',()=>{window.brawlArena=new BrawlArena()});
