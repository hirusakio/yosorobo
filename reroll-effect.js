(()=>{
  function init(){
    const reroll=document.getElementById('reroll');
    const wrap=document.getElementById('rerollWrap');
    if(!reroll||!wrap)return;

    // Keep the previous two-arrow shape, but use the blue/red colors from the reference image.
    const svg=reroll.querySelector('svg');
    if(svg){
      svg.setAttribute('viewBox','0 0 32 32');
      svg.innerHTML=`
        <path d="M24.3 10.8A10.5 10.5 0 0 0 12.1 6.6" stroke="#2879d0" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M9.4 6.0l4.4-1.0M9.4 6.0l.7-4.4" stroke="#2879d0" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M7.7 21.2A10.5 10.5 0 0 0 19.9 25.4" stroke="#e24b43" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M22.6 26.0l-4.4 1.0M22.6 26.0l-.7 4.4" stroke="#e24b43" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    }

    const overlay=document.createElement('div');
    overlay.id='rerollEffect';
    overlay.hidden=true;
    overlay.innerHTML=`<div class="lotteryCard">
      <div class="rerollEffectText">再抽選中…</div>
      <div class="rerollEffectSub">しばらくお待ちください</div>
      <div class="lotteryMachine" aria-hidden="true">
        <div class="woodDrum">
          <div class="woodRing ring1"></div><div class="woodRing ring2"></div>
          <div class="drumHub"></div>
        </div>
        <div class="stand"><div class="standCut"></div></div>
        <div class="crank"><span></span></div>
        <div class="tray"><i></i></div>
        <div class="lotteryBall red"></div><div class="lotteryBall blue"></div><div class="lotteryBall white"></div><div class="lotteryBall gold"></div>
      </div>
    </div>`;
    document.body.appendChild(overlay);

    let busy=false;
    reroll.addEventListener('click',e=>{
      e.stopImmediatePropagation();
      if(busy)return;
      busy=true;wrap.hidden=true;overlay.hidden=false;document.body.classList.add('rerolling');
      // Give the browser a frame to paint the effect before rebuilding the large word sheet.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        setTimeout(()=>{
          if(typeof build==='function')build();
          setTimeout(()=>{overlay.hidden=true;document.body.classList.remove('rerolling');busy=false},1050);
        },850);
      }));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
