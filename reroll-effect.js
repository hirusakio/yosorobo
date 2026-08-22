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

  if(typeof build==='function'){
    const originalBuild=build;
    build=function(){
      if(Array.isArray(words)){
        words=[...new Set(words.map(w=>WORD_REPLACEMENTS.get(w)??w))];
        const infoEl=document.getElementById('info');
        if(infoEl&&words.length)infoEl.textContent=`全${words.length}語から自動表示`;
      }
      return originalBuild();
    };
  }

  function init(){
    const button=document.getElementById('reroll');
    const wrap=document.getElementById('rerollWrap');
    const settingsPanel=document.getElementById('settingsPanel');
    if(!button||!wrap)return;

    if(settingsPanel&&!document.getElementById('darkToggle')){
      const row=document.createElement('div');
      row.className='settingRow';
      row.innerHTML='<span>ダークモード</span><label class="settingToggle"><input id="darkToggle" type="checkbox"><span class="miniSwitch"></span></label>';
      settingsPanel.prepend(row);
      const darkToggle=row.querySelector('#darkToggle');
      darkToggle.checked=document.documentElement.classList.contains('inverted');
      darkToggle.addEventListener('change',()=>{
        document.documentElement.classList.toggle('inverted',darkToggle.checked);
      });
    }

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
      wrap.hidden=true;
      overlay.hidden=false;
      document.body.classList.add('rerolling');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        setTimeout(()=>{
          if(typeof build==='function')build();
          setTimeout(()=>{
            overlay.hidden=true;
            document.body.classList.remove('rerolling');
            busy=false;
          },250);
        },650);
      }));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();