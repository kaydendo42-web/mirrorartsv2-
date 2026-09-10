import type { CSSProperties } from "react";

// Abstract stage materials, not exam-board marks or invented certificates.
// Photographs and the shared motion controls are supplied by ArtsComposition.
export function VoiceArtwork() {
  return (
    <svg className="art-voice" viewBox="0 0 600 650" fill="none">
      <g className="art-voice__rings">
        {[144, 128, 112, 96, 80].map((radius, i) => (
          <circle key={radius} cx="425" cy="155" r={radius}
            stroke={i === 0 ? "#C9A227" : "#B9ADE8"} strokeWidth={i === 0 ? 2 : 9} />
        ))}
      </g>
      <circle cx="425" cy="155" r="64" fill="#54283F" />
      <g stroke="#E3C766" strokeWidth="5" strokeLinecap="round">
        {[14, 26, 46, 68, 42, 22, 52, 74, 35, 18, 30].map((height, i) => (
          <path key={i} className="art-voice__bar"
            d={`M${375 + i * 10} ${155 - height / 2}v${height}`}
            style={{ animationDelay: `${i * -.19}s` } as CSSProperties} />
        ))}
      </g>
      <path className="art-voice__thread" pathLength="1"
        d="M57 350C-3 172 91 24 230 66C367 108 194 481 443 468C518 464 559 408 548 354"
        stroke="#C9A227" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function StageArtwork() {
  return (
    <svg className="art-paper-stage" viewBox="0 0 600 550" fill="none">
      <path d="M71 426 106 52 499 86 527 462Z" fill="#E5DEEF" />
      <g className="art-paper-stage__wing art-paper-stage__wing--left">
        <path d="M106 52 217 112 195 438 71 426Z" fill="#B9ADE8" />
        <path d="M106 52 152 78 122 431 71 426Z" fill="#A18CC5" />
        <path d="M174 91 217 112 195 438 155 436Z" fill="#CFC2E8" />
        <path d="M106 52 217 112 195 438" stroke="#54283F" strokeOpacity=".25" />
      </g>
      <g className="art-paper-stage__wing art-paper-stage__wing--right">
        <path d="M499 86 406 131 420 450 527 462Z" fill="#54283F" />
        <path d="M499 86 460 105 483 457 527 462Z" fill="#73405D" />
        <path d="M436 117 406 131 420 450 449 453Z" fill="#68314F" />
      </g>
      <path d="M106 52 217 112 406 131 499 86Z" fill="#C9A227" />
      <path d="M106 52 113 77 217 133 217 112Z" fill="#B48F22" />
      <path d="M217 112 217 133 406 152 406 131Z" fill="#E3C766" />
      <path d="M71 426 195 389 420 406 527 462Z" fill="#D7CBE5" />
      <path d="M45 444 526 484M32 460 538 501M19 476 550 518" stroke="#B9ADE8" strokeWidth="1.5" />
      <path className="art-paper-stage__thread" pathLength="1"
        d="M43 200C-20 78 280 -11 466 52C617 103 570 354 459 380"
        stroke="#C9A227" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
