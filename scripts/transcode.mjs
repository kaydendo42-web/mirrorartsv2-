/* Six production masters become twelve small committed files and six hosted
 * renders.
 *
 * Two committed outputs per work:
 *   - a silent 10s loop, 1280 wide, for the card grid
 *   - a poster frame at 1920x1080, cut from the same timecode so the swap
 *     from poster to loop is invisible
 *
 * A third output — a full-length 1920 web render with audio, for the
 * case-study page — is behind `--full`. It goes to media/renders/, which is
 * gitignored, and from there to Vercel Blob:
 *
 *   vercel blob put media/renders/<slug>-1920.mp4 --pathname productions/<slug>-1920.mp4
 *
 * The URL Blob returns is what lib/content/productions.ts carries as
 * video.full. A test asserts video.full is an absolute URL precisely so a
 * repo path cannot creep in and quietly add 150 MB to every clone.
 *
 * START TIMES WERE CHOSEN BY WATCHING EACH WORK, not by picking a round
 * number. Every master was sampled at fifteen points, then each candidate
 * start was sampled again every two seconds across its full ten seconds, to
 * confirm the whole window holds. That is what caught the things a round
 * number walks into: Born to Fly opens on a credits card, Brushstrokes opens
 * on a static ink-wash title, both galas open on a black house, and the
 * Jungle Book film is a behind-the-scenes documentary whose interview
 * segments carry burned-in lower-thirds and subtitles. A loop that opens on
 * a name super is worse than no loop.
 *
 * The five older masters live in the archived build's media folder; the
 * 2026 competition master was downloaded from the client's Drive on
 * 20 September 2026 into ./media, which is gitignored.
 */
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";

const OUT = "public/assets/video";
const ARCHIVE = "../Original Website/media";
const WANT_FULL = process.argv.includes("--full");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

const WORKS = [
  {
    slug: "born-to-fly",
    src: `${ARCHIVE}/born-to-fly-olympic-mv.mov`,
    /* 00:25. The recording booth, then the girl on the Docklands marina.
       Before this is a credits card; after 00:35 it cuts to an ice rink. */
    start: 25,
  },
  {
    slug: "brushstrokes-of-history",
    src: `${ARCHIVE}/bihua-chunqiu-original-mv.mp4`,
    /* 01:41. Four children in hanfu singing in the garden, holding through
       the pavilion. The first thirty seconds are a static ink-wash title. */
    start: 101,
  },
  {
    slug: "jungle-book",
    src: `${ARCHIVE}/2025-jungle-book-stage-production.mp4`,
    /* 01:59. The only stretch of this film that is performance rather than
       interview, and the only one with no lower-third or subtitle burned in.
       It overlaps the homepage hero's 1:49-2:50 window, which is a real cost
       and the least bad option: everything outside that window is either an
       interview with a name super or subtitled rehearsal footage.
       01:55 also works as a loop but its first frame is a wide, dark house
       shot, and that frame is the poster — the thing most visitors will only
       ever see. Four seconds later the camera is on Shere Khan. */
    start: 119,
  },
  {
    slug: "youth-drama-speech-debate-2026",
    src: "media/2026-youth-drama-speech-debate-competition.mov",
    /* 00:02. The opening montage: Glen Eira Town Hall in autumn sun, the
       clock tower, the honour roll, the registration desk, a medal, the
       stage lights, the event banner, the hall ceiling. This is the only
       subtitle-free ten seconds in the film. From 00:15.5 to 02:12 the
       adjudicators' and principal's speeches carry burned-in captions on
       every shot, and the competitors' own intro slides name each child on
       the projector behind them; after 02:12 the film fades through the
       group photograph to the organiser's logo. Starting at 00:02 rather
       than 00:00 clears the fade-up from black, so the poster frame is the
       town hall in full daylight and not a half-lit one. */
    start: 2,
  },
  {
    slug: "snake-year-gala",
    src: `${ARCHIVE}/2025-snake-year-gala-promo.mp4`,
    /* 01:25. Five dance numbers back to back — the densest ten seconds in the
       file. Two seconds earlier catches the choir, but from behind the
       conductor, and her back would be the poster frame. */
    start: 85,
  },
  {
    slug: "horse-year-gala",
    src: `${ARCHIVE}/2026-horse-year-gala-promo.mp4`,
    /* 01:52. Choir, violin, guzheng, orchestra, dance. Two seconds earlier
       is a lectern speech with the speaker's name and title supered. */
    start: 112,
  },
];

await mkdir(OUT, { recursive: true });
if (WANT_FULL) await mkdir("media/renders", { recursive: true });

const ff = (args) => execFileSync("ffmpeg", ["-y", "-v", "error", ...args], { stdio: "inherit" });

for (const { slug, src, start } of WORKS) {
  if (ONLY && slug !== ONLY) continue;

  /* Silent, 1280 wide, capped at 25fps — two of the masters are 50fps, and
     a 50fps card loop doubles the bitrate for motion nobody is watching. */
  ff([
    "-ss", String(start), "-i", src, "-t", "10",
    "-an",
    "-vf", "scale=1280:-2",
    "-r", "25",
    "-c:v", "libx264", "-crf", "30", "-preset", "slow",
    "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    `${OUT}/${slug}-loop.mp4`,
  ]);

  /* Exactly 1920x1080, because productions.ts declares those numbers and
     next/image reserves layout from them. Every master is 16:9, so this is
     a scale and not a crop. */
  ff([
    "-ss", String(start), "-i", src, "-frames:v", "1",
    "-vf", "scale=1920:1080",
    "-q:v", "3",
    `${OUT}/${slug}-poster.jpg`,
  ]);

  if (WANT_FULL) {
    ff([
      "-i", src,
      "-vf", "scale=1920:-2",
      "-c:v", "libx264", "-crf", "27", "-preset", "slow",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart", "-pix_fmt", "yuv420p",
      `media/renders/${slug}-1920.mp4`,
    ]);
  }

  console.log(`done ${slug}  (loop from ${start}s${WANT_FULL ? ", full render" : ""})`);
}

if (!WANT_FULL) {
  console.log(
    "\nFull-length renders skipped. Re-run with --full, upload\n" +
      "media/renders/*.mp4 to Vercel Blob, and fill the returned URLs into\n" +
      "lib/content/productions.ts as video.full.",
  );
}
