(()=>{
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