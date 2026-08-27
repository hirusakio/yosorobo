(()=>{
  const WORD_REPLACEMENTS=new Map([
    ['手続','手続き'],
    ['もち','餅'],
    ['引き分ける','引き分け'],
    ['むくむ','むくみ'],
    ['バックレ','バックレる'],
    ['利き○○','利き酒'],
    ['利き〇〇','利き酒'],
    ['ねぎ','ネギ'],
    ['許し合う','許す'],

    ['売切れ','売り切れ'],
    ['引越し','引っ越し'],
    ['待合せ','待ち合わせ'],
    ['からあげ','唐揚げ'],
    ['こしょう','胡椒'],
    ['サケ','鮭'],
    ['イス','椅子'],
    ['マンガ','漫画'],
    ['ねじ','ネジ'],
    ['ばね','バネ'],
    ['判子','ハンコ'],
    ['鞄','カバン'],
    ['売場','売り場'],
    ['申込み','申し込み'],
    ['引継ぎ','引き継ぎ'],

    ['受取','受け取り'],
    ['申出','申し出'],
    ['見掛け倒し','見かけ倒し'],
    ['打合せ','打ち合わせ'],
    ['締切','締め切り'],
    ['肩書','肩書き'],
    ['折込','折り込み'],
    ['吹替','吹き替え'],
    ['のこぎり','ノコギリ'],
    ['尻尾','しっぽ'],
    ['げっぷ','ゲップ'],
    ['誕生会','誕生日会'],

    ['湯のみ','湯飲み'],
    ['画びょう','画鋲'],
    ['ひまわり','ヒマワリ'],
    ['しょうが','ショウガ'],
    ['にんにく','ニンニク'],
    ['おつり','お釣り'],
    ['はがき','ハガキ'],
    ['ひげ','ヒゲ']
  ]);

  const SPEED_STAGES=[0,.25,.5,.75,1,1.25,1.5,1.75,2];
  const BASE_SPEED=36;

  if(typeof build==='function'){
    const originalBuild=build;
    build=function(){
      if(Array.isArray(words)){
        words=[...new Set(words.map(w=>WORD_REPLACEMENTS.get(w)??w))];
        const infoEl=document.getElementById('info');
        if(infoEl&&words.length)infoEl.textContent=`全${words.length}語から自動表示`;
      }
      const result=originalBuild();
      const wrap=document.getElementById('rerollWrap');
      if(wrap)wrap.hidden=false;
      applySpeedStage(currentSpeedStage());
      return result;
    };
  }

  function currentSpeedStage(){
    const input=document.getElementById('speedRange');
    const i=input?Number(input.value):4;
    return SPEED_STAGES[i]??1;
  }

  function formatSpeedStage(multiplier){
    return `${Number.isInteger(multiplier)?multiplier:String(multiplier)}倍`;
  }

  function applySpeedStage(multiplier){
    const trackEl=document.getElementById('track');
    if(!trackEl)return;
    if(multiplier===0){
      if(typeof speed!=='undefined')speed=BASE_SPEED;
      trackEl.style.animationPlayState='paused';
      return;
    }
    if(typeof speed!=='undefined')speed=BASE_SPEED*multiplier;
    trackEl.style.animationPlayState='running';
    if(typeof applySpeed==='function')applySpeed();
  }

  function installSteppedSpeedControl(){
    const oldInput=document.getElementById('speedRange');
    const speedText=document.getElementById('speedValue');
    if(!oldInput)return;

    const input=oldInput.cloneNode(false);
    input.id='speedRange';
    input.type='range';
    input.min='0';
    input.max='8';
    input.step='1';
    input.value='4';
    input.setAttribute('autocomplete','off');
    input.setAttribute('aria-label','スクロール速度');
    oldInput.replaceWith(input);

    if(speedText) speedText.textContent='1倍';
    input.addEventListener('input',()=>{
      const multiplier=SPEED_STAGES[Number(input.value)]??1;
      if(speedText)speedText.textContent=formatSpeedStage(multiplier);
      applySpeedStage(multiplier);
    });
  }

  function applyDefaultSettings(){
    const font=document.getElementById('fontToggle');
    const color=document.getElementById('colorToggle');
    const size=document.getElementById('sizeToggle');
    const length=document.getElementById('lengthToggle');
    const speedInput=document.getElementById('speedRange');
    const speedText=document.getElementById('speedValue');
    const dark=document.getElementById('darkToggle');

    if(font) font.checked=true;
    if(color) color.checked=true;
    if(size) size.checked=true;
    if(length) length.checked=true;
    if(speedInput) speedInput.value='4';
    if(speedText) speedText.textContent='1倍';
    if(dark) dark.checked=false;

    document.documentElement.classList.remove('inverted');
    if(typeof fontVariation!=='undefined') fontVariation=true;
    if(typeof colorVariation!=='undefined') colorVariation=true;
    if(typeof sizeVariation!=='undefined') sizeVariation=true;
    if(typeof lengthCorrection!=='undefined') lengthCorrection=true;
    applySpeedStage(1);
  }

  function init(){
    const button=document.getElementById('reroll');
    const wrap=document.getElementById('rerollWrap');
    const settingsPanel=document.getElementById('settingsPanel');
    if(!button||!wrap)return;

    wrap.hidden=false;
    installSteppedSpeedControl();

    if(settingsPanel&&!document.getElementById('darkToggle')){
      const row=document.createElement('div');
      row.className='settingRow';
      row.innerHTML='<span>ダークモード</span><label class="settingToggle"><input id="darkToggle" type="checkbox" autocomplete="off"><span class="miniSwitch"></span></label>';
      settingsPanel.prepend(row);
      const darkToggle=row.querySelector('#darkToggle');
      darkToggle.checked=false;
      darkToggle.addEventListener('change',()=>{
        document.documentElement.classList.toggle('inverted',darkToggle.checked);
      });
    }

    ['fontToggle','colorToggle','sizeToggle','lengthToggle','speedRange'].forEach(id=>{
      const el=document.getElementById(id);
      if(el)el.setAttribute('autocomplete','off');
    });
    applyDefaultSettings();
    window.addEventListener('pageshow',()=>requestAnimationFrame(()=>{
      applyDefaultSettings();
      wrap.hidden=false;
    }));

    const svg=button.querySelector('svg');
    if(svg){
      svg.setAttribute('viewBox','0 0 48 48');
      svg.innerHTML='<path d="M9 20A16 16 0 0 1 35 13" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/><path d="M33 7L41 14L31 17Z" fill="currentColor"/><path d="M39 28A16 16 0 0 1 13 35" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/><path d="M15 41L7 34L17 31Z" fill="currentColor"/>';
    }

    const overlay=document.createElement('div');
    overlay.id='rerollEffect';
    overlay.hidden=true;
    overlay.innerHTML='<div class="loadingSpinner" aria-hidden="true"></div><div class="rerollEffectText">再抽選中…</div>';
    document.body.appendChild(overlay);

    let busy=false;
    button.addEventListener('click',e=>{
      e.stopImmediatePropagation();
      if(busy)return;
      busy=true;
      overlay.hidden=false;
      document.body.classList.add('rerolling');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        setTimeout(()=>{
          if(typeof build==='function')build();
          setTimeout(()=>{
            overlay.hidden=true;
            document.body.classList.remove('rerolling');
            wrap.hidden=false;
            busy=false;
          },250);
        },650);
      }));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();