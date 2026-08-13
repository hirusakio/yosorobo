(()=>{
  function init(){
    const reroll=document.getElementById('reroll');
    const wrap=document.getElementById('rerollWrap');
    if(!reroll||!wrap)return;

    // Make the two arrow arcs clearly separate, leaving visible gaps.
    const svg=reroll.querySelector('svg');
    if(svg){
      svg.innerHTML=`
        <path d="M24.4 9.8A10.6 10.6 0 0 0 9.6 6.2" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M9.6 6.2l.4-4.3M9.6 6.2l4.2-.7" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M7.6 22.2A10.6 10.6 0 0 0 22.4 25.8" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M22.4 25.8l-.4 4.3M22.4 25.8l-4.2.7" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    }

    const overlay=document.createElement('div');
    overlay.id='rerollEffect';
    overlay.hidden=true;
    overlay.innerHTML=`<div class="lotteryBox" aria-hidden="true">
      <div class="lotteryDrum"><span class="lotteryDot d1"></span><span class="lotteryDot d2"></span><span class="lotteryDot d3"></span><span class="lotteryDot d4"></span></div>
      <div class="lotteryAxle"></div><div class="lotteryHandle"></div><div class="lotteryLeg left"></div><div class="lotteryLeg right"></div>
    </div><div class="rerollEffectText">再抽選中…</div>`;
    document.body.appendChild(overlay);

    // Capture the click before the existing handler, so the effect paints first.
    reroll.addEventListener('click',e=>{
      e.stopImmediatePropagation();
      wrap.hidden=true;
      overlay.hidden=false;
      document.body.classList.add('rerolling');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        setTimeout(()=>{
          if(typeof build==='function')build();
          setTimeout(()=>{
            overlay.hidden=true;
            document.body.classList.remove('rerolling');
          },650);
        },450);
      }));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
