import{GluonElement,html}from'../gluonjs/gluon.js';class OverwebsBackground extends GluonElement{get template(){return html`
    <style>
    video {
      position: fixed;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: calc(16/9*100vh);
      height: auto;
      -webkit-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
    }
    video.hidden {
      display: none;
    }
    </style>`}static get properties(){return{backgrounds:{type:Object,observer:'_setBackgrounds'},lowBandwidth:{type:Boolean,value:!1},page:{type:String,observer:'_pageChanged'}}}static get observedAttributes(){return['low-bandwidth','page']}attributeChangedCallback(a,b,c){'low-bandwidth'===a&&(this.lowBandwidth=c),'page'===a&&(this.page=c)}set page(a){a!==this._page&&(this._pageChanged(a,this._page),this._page=a)}get page(){return this._page}set backgrounds(a){if(a!==this._backgrounds){if(this._backgrounds=a,this._backgroundElements)for(let a in this._backgroundElements)this._backgroundElements[a]&&this._backgroundElements[a].remove();for(let b in this._backgroundElements={},a)if(!a[b].mirror){let c=document.createElement('video');c.videoSource=a[b].video||void 0,c.posterSource=a[b].image,c.playsInline=!0,c.preload='none',c.loop=!a[b].transition,c.id=b,c.classList.add('hidden'),this.shadowRoot.appendChild(c),this._backgroundElements[b]=c}for(let b in a)a[b].mirror&&(this._backgroundElements[b]=this._backgroundElements[a[b].mirror]);this._pageChanged(this.page)}}get backgrounds(){return this._backgrounds}_pageChanged(a,b){if(!this.backgrounds||!this._backgroundElements)return void console.warn('Attempting to load page background, but background data is not loaded');if(a){b=b||'';let c=this._backgroundElements[b+'_to_'+a]||this._backgroundElements['to_'+a]||this._backgroundElements[a];c?this._transition(c):(console.warn('Page has no background data'),this._currentlyShowing&&this._stop(this._currentlyShowing))}}_stop(a){a.classList.add('hidden'),a.removeEventListener('ended',this._endedListener),a.paused||a.pause(),a.currentTime=0}_transition(a){if(this.lowBandwidth&&this.backgrounds[a.id].transition)return void this._transition(this._backgroundElements[this.backgrounds[a.id].transition]);a.poster=a.posterSource,a.classList.remove('hidden'),this._currentlyShowing&&a!==this._currentlyShowing&&this._stop(this._currentlyShowing),this.lowBandwidth||a.videoSource===void 0||('auto'!==a.preload&&(a.src=a.videoSource,a.preload='auto',a.load()),a.play()),this._currentlyShowing=a;let b=[];this.backgrounds[a.id].transition&&(b=b.concat(this.backgrounds[a.id].transition)),this.backgrounds[a.id].preload&&(b=b.concat(this.backgrounds[a.id].preload)),b=b.map((a)=>this._backgroundElements[a]),b.forEach((a)=>{if(this.lowBandwidth)for(;this.backgrounds[a.id].transition;)a=this._backgroundElements[this.backgrounds[a.id].transition];else'auto'!==a.preload&&(a.src=a.videoSource,a.preload='auto');a.posterSource&&(a.poster=a.posterSource)}),this.backgrounds[a.id].transition&&(this._endedListener=()=>{this._transition(this._backgroundElements[this.backgrounds[a.id].transition])},a.addEventListener('ended',this._endedListener))}}customElements.define(OverwebsBackground.is,OverwebsBackground);
//# sourceMappingURL=overwebs-background.js.map
