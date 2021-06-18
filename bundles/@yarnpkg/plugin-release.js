/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-release",
factory: function (require) {
var plugin;(()=>{var e={269:function(e){e.exports=function(){function e(t,o,r,n,a,s,i){var c,l,p="",d=0,h=n.slice(0);if(h.push([o,r])&&n.length>0&&(n.forEach((function(e,t){t>0&&(p+=(e[1]?" ":"│")+"  "),l||e[0]!==o||(l=!0)})),p+=function(e,t){var o=t?"└":"├";return o+=e?"─ ":"──┐"}(t,r)+t,a&&("object"!=typeof o||o instanceof Date)&&(p+=": "+o),l&&(p+=" (circular ref.)"),i(p)),!l&&"object"==typeof o){var u=function(e,t){var o=[];for(var r in e)e.hasOwnProperty(r)&&(t&&"function"==typeof e[r]||o.push(r));return o}(o,s);u.forEach((function(t){c=++d===u.length,e(t,o[t],c,h,a,s,i)}))}}var t={asLines:function(t,o,r,n){e(".",t,!1,[],o,"function"!=typeof r&&r,n||r)},asTree:function(t,o,r){var n="";return e(".",t,!1,[],o,r,(function(e){n+=e+"\n"})),n}};return t}()}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,o),a.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";o.r(r),o.d(r,{default:()=>y});function e(e,t,o,r){var n,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(s=(a<3?n(s):a>3?n(t,o,s):n(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s}Object.create;Object.create;const t=require("@yarnpkg/core"),n=require("clipanion"),a=require("fs"),s=require("@yarnpkg/fslib"),i=require("@yarnpkg/parsers");require("semver");var c;async function l(e,{allowEmpty:o=!1}={}){const r=e.configuration;if(null===r.projectCwd)throw new n.UsageError("This command can only be run from within a Yarn project");const a=await async function(e){let t,o=null,r=e;do{t=r,await s.xfs.existsPromise(s.ppath.join(t,".git"))&&(o=t),r=s.ppath.dirname(t)}while(null===o&&r!==t);return o}(r.projectCwd),l=null!==a?await async function(e,{baseRefs:o}){if(0===o.length)throw new n.UsageError("Can't run this command with zero base refs specified.");const r=[];for(const n of o){const{code:o}=await t.execUtils.execvp("git",["merge-base",n,"HEAD"],{cwd:e});0===o&&r.push(n)}if(0===r.length)throw new n.UsageError("No ancestor could be found between any of HEAD and "+o.join(", "));const{stdout:a}=await t.execUtils.execvp("git",["merge-base","HEAD",...r],{cwd:e,strict:!0}),s=a.trim(),{stdout:i}=await t.execUtils.execvp("git",["show","--quiet","--pretty=format:%s",s],{cwd:e,strict:!0});return{hash:s,title:i.trim()}}(a,{baseRefs:r.get("changesetBaseRefs")}):null,p=null!==a?await async function(e,{base:o,project:r}){const n=t.miscUtils.buildIgnorePattern(r.configuration.get("changesetIgnorePatterns")),{stdout:a}=await t.execUtils.execvp("git",["diff","--name-only",""+o],{cwd:e,strict:!0}),i=a.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>s.ppath.resolve(e,s.npath.toPortablePath(t))),{stdout:c}=await t.execUtils.execvp("git",["ls-files","--others","--exclude-standard"],{cwd:e,strict:!0}),l=c.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>s.ppath.resolve(e,s.npath.toPortablePath(t))),p=[...new Set([...i,...l].sort())];return n?p.filter(e=>!s.ppath.relative(r.cwd,e).match(n)):p}(a,{base:l.hash,project:e}):[],d=r.get("deferredVersionFolder"),h=p.filter(e=>null!==s.ppath.contains(d,e));if(h.length>1)throw new n.UsageError("Your current branch contains multiple versioning files; this isn't supported:\n- "+h.join("\n- "));const u=new Set(t.miscUtils.mapAndFilter(p,o=>{const r=e.tryWorkspaceByFilePath(o);return null===r?t.miscUtils.mapAndFilter.skip:r}));if(0===h.length&&0===u.size&&!o)return null;const f=1===h.length?h[0]:s.ppath.join(d,t.hashUtils.makeHash(Math.random().toString()).slice(0,8)+".yml"),g=s.xfs.existsSync(f)?await s.xfs.readFilePromise(f,"utf8"):"{}",w=(0,i.parseSyml)(g),m=new Map;for(const o of w.declined||[]){const r=t.structUtils.parseIdent(o),n=e.getWorkspaceByIdent(r);m.set(n,c.DECLINE)}for(const[o,r]of Object.entries(w.releases||{})){const n=t.structUtils.parseIdent(o),a=e.getWorkspaceByIdent(n);m.set(a,r)}return{project:e,root:a,baseHash:null!==l?l.hash:null,baseTitle:null!==l?l.title:null,changedFiles:new Set(p),changedWorkspaces:u,releaseRoots:new Set([...u].filter(e=>null!==e.manifest.version)),releases:m,async saveAll(){const o={},r=[],n=[];for(const a of e.workspaces){if(null===a.manifest.version)continue;const e=t.structUtils.stringifyIdent(a.locator),s=m.get(a);s===c.DECLINE?r.push(e):void 0!==s?o[e]=s:u.has(a)&&n.push(e)}await s.xfs.mkdirPromise(s.ppath.dirname(f),{recursive:!0}),await s.xfs.changeFilePromise(f,(0,i.stringifySyml)(new i.stringifySyml.PreserveOrdering({releases:Object.keys(o).length>0?o:void 0,declined:r.length>0?r:void 0,undecided:n.length>0?n:void 0})))}}}!function(e){e.UNDECIDED="undecided",e.DECLINE="decline",e.MAJOR="major",e.MINOR="minor",e.PATCH="patch",e.PRERELEASE="prerelease"}(c||(c={}));class p{constructor(e,t=new Set){this.workspace=e,this.children=new Set,this.history=new Set,this.history=new Set(t),this.history.add(e.locator.locatorHash)}get name(){return this.workspace.manifest.raw.name}forJSON(){return{name:this.name,children:[...this.children].map(e=>e.forJSON())}}}class d{async buildTree(e){await e.restoreInstallState();const t=this.getEssentialWorkspaces(e);if(0===t.length)throw new Error("Project doesn't have any essentail workspaces");const o=t.map(t=>{const o=new p(t);return this.fillChildrenNodes(e,o),o}),r=new p(e.topLevelWorkspace);return r.children=new Set(o),r}getWorkspacePackage(e,t){const o=e.storedPackages.get(t.anchoredLocator.locatorHash);if(!o)throw new Error("Unknown workspace");return o}getEssentialWorkspaces(e){return e.workspaces.filter(t=>t.locator.name!==e.topLevelWorkspace.locator.name&&0===this.getWorkspaceInternalDependencies(e,t).size)}getWorkspaceInternalDependencies(e,t){const o=this.getWorkspacePackage(e,t),r=new Set;return[...o.dependencies,...o.peerDependencies].forEach(([,t])=>{const o=e.tryWorkspaceByIdent(t);o&&r.add(o)}),r}getWorkspaceExternalDependencies(e,t){const o=e.workspaces.filter(o=>{const r=this.getWorkspacePackage(e,o);return r.dependencies.has(t.locator.identHash)||r.peerDependencies.has(t.locator.identHash)});return new Set(o)}fillChildrenNodes(e,t){const{workspace:o,history:r}=t;this.getWorkspaceExternalDependencies(e,o).forEach(o=>{const n=o.locator.locatorHash;if(r.has(n))return;const a=new p(o,r);t.children.add(a),this.fillChildrenNodes(e,a)})}}class h{constructor(){this.topologyManager=new d}async generateReport(e,t){const{ignoreRoot:o=!1,topological:r=!0}=t||{},n=await l(e);if(!n)throw new Error("No any relevant information about the project");const a=function(e,t=[]){const{changedFiles:o,changedWorkspaces:r,root:n}=e,a={generatedAt:Date.now(),root:n,changedWorkspaces:[...r].filter(({locator:e})=>!t.includes(e.locatorHash)).map(({locator:e,cwd:t,relativeCwd:o,manifest:r})=>({fullName:r.raw.name||e.name,name:e.name,scope:e.scope,locatorHash:e.locatorHash,path:t,relativePath:o,currentVersion:e.reference,changedFiles:[],dependencies:r.dependencies}))},s=a.changedWorkspaces.sort((e,t)=>e.path.length>=t.path.length?-1:1);return o.forEach(e=>{const t=s.find(({path:t})=>e.includes(t));t&&t.changedFiles.push(e)}),a}(n,o?[e.topLevelWorkspace.locator.locatorHash]:[]);return r&&(a.changedWorkspaces=await this.topologicalWorkspaces(e,a.changedWorkspaces)),a}async topologicalWorkspaces(e,t){const o=await this.topologyManager.buildTree(e),r=new Map;return this.fillRankedToplogicalList(o,r),t.sort((e,t)=>r.get(e.locatorHash)<=r.get(t.locatorHash)?-1:1)}fillRankedToplogicalList(e,t,o=0){const r=t.get(e.workspace.locator.locatorHash);(void 0===r||r<o)&&t.set(e.workspace.locator.locatorHash,o),e.children.forEach(e=>{this.fillRankedToplogicalList(e,t,o+1)})}}class u extends n.Command{constructor(){super(...arguments),this.ignoreRoot=!1,this.saveReport=!1,this.topological=!0,this.reportManager=new h}async execute(){const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:o}=await t.Project.find(e,this.context.cwd),r=await this.reportManager.generateReport(o,{ignoreRoot:this.ignoreRoot,topological:this.topological});this.outputReport(r)}outputReport(e){const t=JSON.stringify(e);this.saveReport?(0,a.writeFileSync)("./report.json",t,"utf-8"):console.dir(t)}}u.usage=n.Command.Usage({category:"Release commands",description:"Generate json report about release candidates"}),e([n.Command.Boolean("--ignore-root",{description:"Ignore the root workspace"})],u.prototype,"ignoreRoot",void 0),e([n.Command.Boolean("--save-report",{description:"Save JSON at your filesystem otherwise the result will be printed at your terminal."})],u.prototype,"saveReport",void 0),e([n.Command.Boolean("-t,--topological",{description:"Preserve topological ordering."})],u.prototype,"topological",void 0),e([n.Command.Path("release","report")],u.prototype,"execute",null);var f,g=o(269);function w(e){if(0===e.children.size)return null;const t={};return e.children.forEach(e=>{t[e.name]=w(e)}),t}!function(e){e.json="json",e.tree="tree"}(f||(f={}));class m extends n.Command{constructor(){super(...arguments),this.outputFormat=f.tree,this.topologyManager=new d}async execute(){this.validateInput();const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:o}=await t.Project.find(e,this.context.cwd),r=await this.topologyManager.buildTree(o);console.log(this.formattedOutputTree(r))}validateInput(){if(!Object.keys(f).includes(this.outputFormat))throw new n.UsageError("Invalid --output-format option, can be 'json', 'tree'")}formattedOutputTree(e){switch(this.outputFormat){case f.json:return JSON.stringify(e.forJSON());case f.tree:return(0,g.asTree)({[(t=e).name]:w(t)},!1,!0);default:return""}var t}}m.usage=n.Command.Usage({category:"Release commands",description:"Generate json topological tree"}),e([n.Command.String("-o,--output-format",{description:"Output format, can be 'json', 'tree'"})],m.prototype,"outputFormat",void 0),e([n.Command.Path("release","tree")],m.prototype,"execute",null);const y={commands:[u,m]}})(),plugin=r})();
return plugin;
}
};