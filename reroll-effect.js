(()=>{
  function init(){
    const reroll=document.getElementById('reroll');
    const wrap=document.getElementById('rerollWrap');
    if(!reroll||!wrap)return;

    // Arrow arcs stop before their arrowheads so the curve and arrowhead never overlap.
    const svg=reroll.querySelector('svg');
    if(svg){
      svg.innerHTML=`
        <path d="M24.3 10.8A10.5 10.5 0 0 0 12.1 6.6" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M9.4 6.0l4.4-1.0M9.4 6.0l.7-4.4" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M7.7 21.2A10.5 10.5 0 0 0 19.9 25.4" stroke-width="2.7" stroke-linecap="round" fill="none"/>
        <path d="M22.6 26.0l-4.4 1.0M22.6 26.0l-.7 4.4" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    }

    const overlay=document.createElement('div');
    overlay.id='rerollEffect';
    overlay.hidden=true;
    overlay.innerHTML=`<div class="lotteryCard">
      <svg class="lotterySvg" viewBox="0 0 180 150" aria-hidden="true">
        <defs>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b97939"/><stop offset=".5" stop-color="#8b5428"/><stop offset="1" stop-color="#6b3f20"/></linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe78b"/><stop offset="1" stop-color="#c99016"/></linearGradient>
        </defs>
        <g stroke="#5c3b22" stroke-width="3" stroke-linejoin="round">
          <path d="M45 126h92" stroke="#7a5637" stroke-width="7" stroke-linecap="round"/>
          <path d="M58 119L69 70M124 119l-11-49" fill="none"/>
          <path d="M63 119h18M107 119h18" stroke-width="6" stroke-linecap="round"/>
        </g>
        <g class="drumSpin">
          <path d="M55 47l18-17h39l18 17v38l-18 17H73L55 85z" fill="url(#wood)" stroke="#5c3b22" stroke-width="3"/>
          <path d="M65 51l13-12h29l13 12v30l-13 12H78L65 81z" fill="none" stroke="#d9a66c" stroke-width="2" opacity=".75"/>
          <circle cx="92.5" cy="66" r="6" fill="#d8d0c6" stroke="#5e5e5e" stroke-width="2"/>
          <path d="M69 54c14 4 32 4 48 0M68 76c16-5 34-5 49 0" fill="none" stroke="#6e4526" stroke-width="2" opacity=".65"/>
        </g>
        <g>
          <circle cx="92.5" cy="66" r="5" fill="#c8c8c8" stroke="#686868" stroke-width="2"/>
          <g class="handleTurn" transform="translate(92.5 66)">
            <path d="M0 0h31" stroke="#777" stroke-width="5" stroke-linecap="round"/>
            <circle cx="31" cy="0" r="6" fill="#9c6334" stroke="#5c3b22" stroke-width="2"/>
          </g>
        </g>
        <path d="M75 96h35l-6 11H81z" fill="#8b5428" stroke="#5c3b22" stroke-width="2"/>
        <path d="M80 108h31" stroke="#5c3b22" stroke-width="3" stroke-linecap="round"/>
        <circle class="ball red" cx="93" cy="109" r="6" fill="#d84a43" stroke="#8b2824" stroke-width="1.5"/>
        <circle class="ball blue" cx="93" cy="109" r="6" fill="#3f80d4" stroke="#24528d" stroke-width="1.5"/>
        <circle class="ball white" cx="93" cy="109" r="6" fill="#f7f4ed" stroke="#b9b6af" stroke-width="1.5"/>
        <circle class="ball gold" cx="93" cy="109" r="6" fill="url(#gold)" stroke="#9a6d11" stroke-width="1.5"/>
      </svg>
      <div class="rerollEffectText">再抽選中…</div>
      <div class="rerollEffectSub">ガラガラ抽選中</div>
    </div>`;
    document.body.appendChild(overlay);

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
          },850);
        },700);
      }));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
