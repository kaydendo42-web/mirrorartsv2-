import type { Asset, Slug } from "./types.ts";

/* Leadership, from content/MIRROR-ARTS-EDUCATION.md §5's leadership table:
 * Rachel Fu, Koven Song, Diana Zhao, Rachel Cai.
 *
 * Rachel Fu and Koven Song are the two founders. Their credit lists are the
 * strongest credibility material the business has — a Central Academy of
 * Drama training, a Ning Hao film that won Best Director at the 2001
 * Beijing College Student Film Festival, lead dubbing on eight features and
 * a CCTV gala — and the old site rendered all of it as a JPEG. They carry
 * no course in the catalogue, so they appear here only, cross-linked from
 * faculty.ts's teacher pages.
 *
 * Diana Zhao (Operations Director) and Rachel Cai (Marketing Director) each
 * also teach — bilingual hosting/dubbing and posture respectively. Their
 * faculty.ts entries carry alsoLeadership: true. Their credit lists here are
 * empty: §5 gives no itemised career list for either the way it does for
 * the founders, and their subject-matter credentials already live on their
 * Teacher entries.
 *
 * Chinese work titles keep their Chinese. Where the old site gave an English
 * gloss, both are kept, e.g. Thursday, Wednesday《星期四，星期三》. The
 * two awards on Rachel Fu's 2000 credit — Best Director at the 2001 Beijing
 * College Student Film Festival, and a Silver Award at the China Digital
 * Media Competition for College Students — are kept as their own clauses,
 * not folded into the film's title. */

export type Credit = { year: number | string; text: string };

export type Leader = {
  slug: Slug;
  name: string;
  cn: string;
  role: string;
  roleCn: string;
  bio: string[];
  credits: Credit[];
  portrait: Asset;
};

export const TEAM: Leader[] = [
  {
    slug: "rachel-fu",
    name: "Rachel Fu",
    cn: "傅羽鸽",
    role: "Founder · Executive Director",
    roleCn: "执行董事",
    bio: [
      "Founder and executive director, and a Chinese-Australian actor based in Melbourne.",
      "Graduated 2002 with a degree in Acting from the Central Academy of Drama, China (中央戏剧学院表演系本科).",
    ],
    credits: [
      {
        year: 2024,
        text: "Chief director, Melbourne's first Children's Spring Festival Gala (墨尔本首届少儿新春晚会总导演)",
      },
      {
        year: 2023,
        text: "Executive producer and chief planner, music video Brushstrokes of History《笔画春秋》",
      },
      {
        year: 2022,
        text: "Executive producer and chief planner, music video Born to Fly《此生飞翔》, featured on the official website of the Beijing Winter Olympics Organising Committee",
      },
      {
        year: 2004,
        text: 'Second female lead "Susu" 素素, TV film The Kitchen《后厨》',
      },
      {
        year: 2003,
        text: 'Lead role "Wang Letian" 王乐天, sitcom Wind Through the Four Seasons《风行四季》, directed by Liu Tianchi 刘天池 and Lin Cong 林丛',
      },
      {
        year: 2002,
        text: 'Lead "A Xia" 阿霞, national tour of the stage play Cuihua, Serve the Sauerkraut《翠花，上酸菜》',
      },
      {
        year: 2001,
        text: 'Lead "Keke" 可可, TV film Romance of the Desert《大漠之恋》',
      },
      {
        year: 2000,
        text: 'Lead "He Qian" 何倩, film Thursday, Wednesday《星期四，星期三》, directed by Ning Hao 宁浩 — Best Director Award, 2001 Beijing College Student Film Festival, and Silver Award, China Digital Media Competition for College Students',
      },
      {
        year: 2000,
        text: 'Second female lead "Lu Xiaoman" 陆小曼, TV series Homeland Guardian《守望家园》',
      },
    ],
    portrait: {
      src: "/assets/team/rachel-fu.png",
      alt: "Rachel Fu, founder and executive director",
      width: 376,
      height: 625,
    },
  },

  {
    slug: "koven-song",
    name: "Koven Song",
    cn: "宋晓光",
    role: "Founder · Executive Director",
    roleCn: "执行董事",
    bio: [
      "Founder and executive director, working across acting, directing and music instruction.",
      "Graduated 2002, Central Academy of Drama, Acting.",
    ],
    credits: [
      {
        year: 2022,
        text: "Chief planner and director, music videos Born to Fly《此生飞翔》and Brushstrokes of History《笔画春秋》",
      },
      {
        year: "n.d.",
        text: 'Male lead "Ji Cheng" 纪城, Australian short film《家有两面旗》',
      },
      {
        year: "n.d.",
        text: "Played an immigration lawyer in an Australian corporate commercial",
      },
      {
        year: "n.d.",
        text: "TV roles: 阿天 in《堆积情感》, 眼镜 in《白洋淀·女人和鬼子》, and 范英才 in《水落石出》III",
      },
      {
        year: "n.d.",
        text: "Played 何大壮 in the sitcom Wind Through the Four Seasons《风行四季》, also serving as assistant director",
      },
      {
        year: "n.d.",
        text: "Lead dubbing on eight feature films:《旺角黑夜》《千机变2》《情巅大圣》《霍元甲》《喜剧之王》《老夫子》《如果·爱》and《越光宝盒》",
      },
      {
        year: "n.d.",
        text: "Lead dubbing on the TV series《西门豹》《梅艳芳菲》and《屋顶上的绿宝石》",
      },
      {
        year: 2005,
        text: 'Creator, performer and on-site executive director, CCTV "3·15 Consumer Rights Day" gala',
      },
      {
        year: 2004,
        text: "Executive director, TV series《情系半边天》",
      },
      {
        year: 2003,
        text: 'Male lead "Wuya" 乌鸦, stage play《为你化作流星雨》',
      },
      {
        year: 2002,
        text: "Creation, planning and distribution of the stage play《翠花，上酸菜》",
      },
    ],
    portrait: {
      src: "/assets/team/koven-song.png",
      alt: "Koven Song, founder and executive director",
      width: 383,
      height: 617,
    },
  },

  {
    slug: "diana-zhao",
    name: "Diana Zhao",
    cn: "戴安娜",
    role: "Operations Director",
    roleCn: "运营总监",
    bio: [
      "Operations Director, and the bilingual hosting and dubbing teacher.",
      "Grew up in Melbourne, then trained in broadcasting and hosting at the Shanghai Theatre Academy. Over ten years and more than 1,000 events as a bilingual MC.",
    ],
    credits: [],
    portrait: {
      src: "/assets/team/diana-zhao.png",
      alt: "Diana Zhao, operations director",
      width: 262,
      height: 444,
    },
  },

  {
    slug: "rachel-cai",
    /* 蔡心翼 off her September 2026 teacher card, which replaced §5's
       蔡馨熠 — same reading, different characters. faculty.ts carries the
       same correction; the two files must not disagree about her name. */
    name: "Rachel Cai",
    cn: "蔡心翼",
    role: "Marketing Director",
    roleCn: "市场总监",
    bio: [
      "Marketing Director, and the dance and posture teacher.",
      "Holds a Master of Education from Monash University, a Beijing Dance Academy teaching certification and ACIC certification as a senior trainer in posture and etiquette. Was an etiquette and posture trainer for an international airline before teaching children.",
    ],
    credits: [],
    portrait: {
      src: "/assets/team/rachel-cai.png",
      alt: "Rachel Cai, marketing director",
      width: 261,
      height: 448,
    },
  },
];

export function getLeader(slug: Slug): Leader {
  const found = TEAM.find((l) => l.slug === slug);
  if (!found) throw new Error(`unknown leader: ${slug}`);
  return found;
}
