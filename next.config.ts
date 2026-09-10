import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* These three former pages now live as sections on their parent pages. The
     fragments keep old bookmarks and indexed links useful while matching the
     destinations exposed in the masthead. */
  redirects() {
    return [
      {
        source: "/about/partners",
        destination: "/about#partners",
        permanent: true,
      },
      {
        source: "/stage/achievements",
        destination: "/stage#achievements",
        permanent: true,
      },
      {
        source: "/workshops/schools",
        destination: "/workshops#schools",
        permanent: true,
      },
      /* /courses/exams was a real page. Its material first moved to
     /stage/achievements and now lives in the achievements section of /stage.
     A 308 rather than a 307 because the move is permanent, and it preserves
     the request method, which a 301 does not.

     The old route existed on the live site, so this is what keeps an indexed
     link, a bookmark or a printed flyer working. Do not delete it because the
     page is gone — the page being gone is why it is here. */
      {
        source: "/courses/exams",
        destination: "/stage#achievements",
        permanent: true,
      },
      /* /about/team was the leadership page — the four people who run the
         school. It is gone at the client's direction: the site is meant to
         show who teaches, not who manages. Someone arriving on the old URL
         wanted people, so /faculty is the honest destination rather than the
         homepage. lib/content/team.ts survives — /faculty still reads a
         teacher's second role out of it. */
      {
        source: "/about/team",
        destination: "/faculty",
        permanent: true,
      },
      /* Three course slugs renamed in the 8 September 2026 revision. Unlike
         everything above, these URLs were never public — nothing has been
         deployed — so no index or bookmark points at them. They are here for
         the preview links already shared with the client, and because a
         renamed page that 404s is the worst outcome of a rename and costs
         three lines to prevent. */
      {
        source: "/courses/english-drama",
        destination: "/courses/drama",
        permanent: true,
      },
      {
        source: "/courses/voice-over",
        destination: "/courses/dubbing",
        permanent: true,
      },
      {
        source: "/courses/posture",
        destination: "/courses/posture-training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
