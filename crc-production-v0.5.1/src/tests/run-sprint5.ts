import { blankConfig, defaultStAugustineConfig, stAugustineSchoolTemplate, validateConfig } from "../lib/config/appConfig";
import { buildRealityFromConfig } from "../lib/reality/configReality";
function assert(ok:boolean,msg:string){if(!ok)throw new Error(msg)}
const personal=defaultStAugustineConfig();assert(validateConfig(personal).length===0,"personal template validates");assert(buildRealityFromConfig(personal).length===6,"personal template has six classes");
const school=stAugustineSchoolTemplate();assert(school.sections.length===0,"school template has no personal classes");assert(school.closures.length>20,"school template preserves closures");assert(school.cycle.anchorDate==="2026-09-08"&&school.cycle.anchorCycleLabel==="A","school template preserves anchor");
const blank=blankConfig();assert(validateConfig(blank).includes("At least one class section is required."),"blank config guides setup");
const bad=defaultStAugustineConfig();bad.sections[1].period=bad.sections[0].period;assert(validateConfig(bad).some(x=>x.includes("listed more than once")),"duplicate period validation");
console.log("✓ Sprint 5 pilot-readiness tests passed");
