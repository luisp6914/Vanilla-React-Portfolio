export type Navigation = 
  | { type : "anchor"; href : string; label : string;} 
  | { type : "link"; to : string; label : string;}