<template>
  <section>
    <Megamenu class="hidden lg:flex px-10" />

    <div class="sm:pb-20 text-gray-800">
      <div class="mb-5 sm:mb-10 relative">
        <img
          v-lazy="
            `https://res.cloudinary.com/anne-biz/image/upload/v1632710825/social-impact/s1_zwxpgt.png?tr=h-384,fo-auto`
          "
          alt=" "
          class="h-80 sm:h-96 w-full object-cover"
        />

        <div
          class="
            absolute
            inset-0
            bg-black bg-opacity-50
            flex
            items-center
            justify-center
          "
        >
          <h1
            class="
              text-white
              font-bold
              tracking-widest
              text-2xl
              sm:text-4xl
              text-center
            "
          >
            Social Impact
          </h1>
        </div>
      </div>

      <div class="container mx-auto max-w-7xl px-2 sm:px-10">
        <div class="mb-5 sm:mb-10 sm:text-center space-y-2.5 sm:space-y-5">
          <h4 class="mb-5 sm:mb-10 text-xl sm:text-3xl tracking-wide font-bold">
            Cambodia The Kingdom of Wonder!
          </h4>

          <p>
            The history of Cambodian art stretches back centuries to ancient
            pottery, silk weaving, and stone carving. The height of Khmer art
            occurred during the Angkor period; much of the era's stone carving
            and architecture survives to the present. In pre-colonial Cambodia,
            art and crafts were generally produced either by rural
            non-specialists for practical use or by skilled artists producing
            works for the Royal Palace. In modern Cambodia, many artistic
            traditions entered a period of decline or even ceased to be
            practiced, but the country has experienced a recent artistic revival
            as the tourist market has increased and governments and NGOs have
            contributed to the preservation of Cambodian culture.
          </p>

          <p>
            HANDMADE history from local to international with each product you
            purchase at <b>Anne.biz</b> will help contribute to a positive
            impact and change in the local community. The local artisans will
            feel a sense of great pride when putting in their effort, commitment
            and time to create these magnificent products. Also, this will help
            support their traditional craft skills as a means of employment,
            help to generate income and economic self-sufficiency with this
            positive change. <b>Anne.biz</b> try to empower local artisan to
            participate in global marketplace and also create sustainable
            livelihood by using nature resource in their respective village.
            Also, this will help support their traditional craft skills as a
            means of employment, help to generate income and economic
            self-sufficiency with this positive change. <b>Anne.biz</b> try to
            empower local artisan to participate in global marketplace and also
            create sustainable livelihood by using nature resource in their
            respective village.
          </p>
        </div>

        <div class="mb-5 sm:mb-10 space-y-2.5 sm:space-y-5 sm:text-center">
          <h5 class="text-lg sm:text-xl tracking-wide font-bold">
            CRAFT COMMUNITY
          </h5>

          <p>
            CRAFT COMMUNITY The local community is present in every province in
            the Kingdom. They have gained generations of knowledge and
            experience to help perfect their techniques and skills to weave and
            to dye fabrics by using natural resources such as indigo flowers,
            mud and more…
          </p>
        </div>

        <div
          v-for="(i, ix) in items"
          :key="ix"
          rel="prefetch"
          class="
            flex flex-col-reverse
            lg:flex-row
            justify-center
            lg:justify-between
            mb-10
            md:mb-20
          "
        >
          <!-- Image section start  -->

          <div
            class="w-full lg:w-1/2"
            :class="ix % 2 === 0 ? 'lg:pe-5' : 'lg:order-1 lg:ps-5'"
          >
            <div v-if="i.imgCdn2" class="grid grid-rows-2 gap-2.5 sm:gap-5">
              <img
                v-lazy="i.imgCdn1"
                alt=" "
                class="sm:h-96 object-contain sm:object-cover w-full"
              />

              <img
                v-lazy="i.imgCdn2"
                alt=" "
                class="sm:h-96 object-contain sm:object-cover w-full"
              />
            </div>

            <div v-else>
              <img
                v-lazy="i.imgCdn1"
                alt=" "
                class="sm:h-96 object-contain sm:object-cover"
              />
            </div>
          </div>

          <!-- Image section end -->

          <!-- Data section start  -->

          <div
            class="w-full lg:w-1/2"
            :class="ix % 2 === 0 ? 'lg:ps-5 lg:order-2 ' : 'lg:pe-5'"
          >
            <div class="flex flex-col space-y-4 text-left leading-loose">
              <h5>{{ i.heading }}</h5>

              <div class="text-sm leading-loose" v-html="i.data"></div>
            </div>
          </div>

          <!-- Data section end -->
        </div>

        <ul
          class="
            mb-5
            sm:mb-10
            space-y-2.5
            sm:space-y-5
            text-gray-500
            sm:text-center
          "
        >
          <li>
            <p>
              At <b>Anne.biz</b> we emphasize in empowering Cambodian local
              artisan and alleviate the poverty in local area by creating
              sustainable livelihood in their respective village and using their
              nature resources and also creating the opportunity for foreign
              customer to entry fair trade and crafted product which has
              beautiful background story behind it.
            </p>
          </li>

          <li>
            <p>
              Moreover, we have developed the platform to make it easier for
              Cambodian local artisan in communicating, developing skills and
              working with us. For price, we emphasize fair trade systems by
              asking price from local artisan base on true cost with their
              profit and also, we do work in hands with the local artisan in a
              supportive manner.
            </p>
          </li>

          <li>
            <p>
              Additionally, we do preserve these handcraft masterpiece and folk
              wisdom those has been passing from generation to generation and
              alleviate the poverty in local area.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Megamenu from '~/components/Home/Megamenu.vue'

export default {
  components: {
    Megamenu,
  },

  data() {
    return {
      items: [
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1632710820/social-impact/s2_fa7bi4.png?tr=h-384,fo-auto`,
          heading: 'SEAGRASS',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li><b>CRAFT COMMUNITY</b> The local community is present in every province in
          the Kingdom. They have gained generations of knowledge and experience
          to help perfect their techniques and skills to weave and to dye
          fabrics by using natural resources such as indigo flowers, mud and
          more…</li>

          <li>  In addition, different group sizes of Seagrass are appropriate to
          different type of handicrafts. Consequently, these masterpiece work is
          the accumulation of local resources and ingenuity with modern
          knowledge. The local community. We regularly visit them so that they
          have adequate support available to them and to help organize the
          marketing for their products on our platform, which helps the locals
          sell on our website. We frequently update our application platform
          with existing and new products for our customers to be updated swiftly
          of the upcoming products.</li>

          <li>  <b>Anne.biz</b> have collected handcraft products in the category of
          furniture for home decoration being produced by Thai artisans,
          Furniture piece work is designed to be contemporary and modern style
          that maintains the Thai style perfectly. Each piece of work is unique
          and different in charm including a variety of usage. Bags are one of
          the fashion lifestyle products. As <b>Anne.biz</b> can comply with customized
          design or customer requirement. Variety of natural materials are
          combined with modern interior design & produced by Cambodian artisans.
          For our shipping service, we use shipping service from reliable
          International Companies and has 100% insurance on what you have
          ordered.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710819/social-impact/s3_akvh64.jpg?tr=h-384,fo-auto`,
          heading: '+ Textiles',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>  Silk weaving in Cambodia has a long history. The practice dates to as
          early as the first century, and textiles were used in trade during
          Angkorian times. Even modern textile production evidences these
          historic antecedents: motifs found on silk today often echo clothing
          details on ancient stone sculptures.</li>

          <li> There are two main types of Cambodian weaving. The ikat technique
          (Khmer: chong kiet), which produces patterned fabric, is quite
          complex. To create patterns, weavers tie and dye portions of weft yarn
          before weaving begins. Patterns are diverse and vary by region; common
          motifs include lattice, stars, and spots. The second weaving
          technique, unique to Cambodia, is called "uneven twill". It yields
          single or two-color fabrics, which are produced by weaving three
          threads so that the "color of one</li>

          <li> <b>Anne.biz</b> have collected handcraft products in the category of
          furniture for home decoration being produced by Thai artisans,
          Furniture piece work is designed to be contemporary and modern style
          that maintains the Thai style perfectly. Each piece of work is unique
          and different in charm including a variety of usage. Bags are one of
          the fashion lifestyle products. As <b>Anne.biz</b> can comply with customized
          design or customer requirement. Variety of natural materials are
          combined with modern interior design & produced by Cambodian artisans.
          For our shipping service, we use shipping service from reliable
          International Companies and has 100% insurance on what you have
          ordered.</li>

          <li>Thread dominates on one side of the fabric, while the two others
          determine the colour on the reverse side</li>

          <li>  Cambodia first started hand-weaving fabric in the 13th century. During
          the years of the Khmer Rouge era, a lot of the hand-weaving stopped
          production due to the political turmoil of the day. Since this period
          many organizations have worked to help Cambodia revive its hand
          weaving industry. Cambodia weaves three kinds of hand weaves such as
          IKAT, twills, and plain weaves. In the past, most fabrics woven has
          been 100% silk, but today Cambodia is starting to weave some
          interesting blended fabrics.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710822/social-impact/s4_unpckm.jpg?tr=h-384,fo-auto`,
          img2: `https://res.cloudinary.com/anne-biz/image/upload/v1632710823/social-impact/s5_sb7gaf.jpg?tr=h-384,fo-auto`,
          heading: '+ Non-textile weaving',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>  Many Cambodian farmers weave baskets (Khmer: tbanh kantrak) for
          household use or as a supplemental source of income. Most baskets are
          many of thinly cut bamboo. Regions known for basketry include Siem
          Reap and Kampong Cham.[3] Mat weaving (tbanh kantuel) is a common
          seasonal occupation. They are most commonly made from reeds, either
          left a natural tan color or dyed in deep jewel tones. The region of
          Cambodia best-known for mat weaving is the Mekong floodplain,
          especially around Lvea Em district. Mats are commonly laid out for
          guests and are important building materials for homes.[4] Wicker and
          rattan crafts (tbanh kanchoeu) made from dryandra trees are also
          significant. Common wicker and rattan products include walls, mats,
          furniture, and other household items.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710822/social-impact/s6_sefmzx.jpg?tr=h-384,fo-auto`,
          heading: '+ Stone carving',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li> Cambodia's best-known stone carving adorns the temples of Angkor,
          which are "renowned for the scale, richness and detail of their
          sculpture". In modern times, however, the art of stone carving became
          rare, largely because older sculptures survived undamaged for
          centuries (eliminating the need for replacements) and because of the
          use of cement molds for modern temple architecture. By the 1970s and
          1980s, the craft of stone carving was nearly lost.</li>

          <li>During the late 20th century, however, efforts to restore Angkor
          resulted in a new demand for skilled stone carvers to replace missing
          or damaged pieces, and a new tradition of stone carving is arising to
          meet this need. Most modern carving is traditional-style, but some
          carvers are experimenting with contemporary designs. Interest is also
          renewing for using stone carving in modern wats. Modern carvings are
          typically made from Banteay Meanchey sandstone, though stone from
          Pursat and Kompong Thom is also used.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710821/social-impact/s7_i8mncy.jpg?tr=h-384,fo-auto`,
          img2: `https://res.cloudinary.com/anne-biz/image/upload/v1632710822/social-impact/s8_c1a83i.jpg?tr=h-384,fo-auto`,
          heading: '+ Lacquerware',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>The height of Cambodian traditional lacquerware was between the 12th
          and 16th centuries; some examples of work from this era, including
          gilded Buddha images and betel boxes, have survived to the present
          day. Lacquerware was traditionally colored black using burnt wood,
          representing the underworld; red using mercury, representing the
          earth; and yellow using arsenic, representing the heavens. Lacquer on
          Angkorian stone dates to the 15th or 16 century.</li>

          <li>In modern Cambodia, the art of lacquerwork nearly faded into oblivion:
          few lacquer trees survived, and lacquer was unavailable in local
          markets. Today's revival is still in its infancy, but 100 lacquer
          artists have been trained by a French expert under the guidance of
          Artisans d'Angkor, a company that produces traditional crafts in
          village workshops. Some artists are "beginning to experiment with
          different techniques and styles...to produce modern and striking
          effects."</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710818/social-impact/s9_yrwimq.jpg?tr=h-384,fo-auto`,
          img2: `https://res.cloudinary.com/anne-biz/image/upload/v1632710818/social-impact/s10_bmho4p.jpg?tr=h-384,fo-auto`,
          heading: '+ Silversmithing',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>Silversmithing in Cambodia dates back centuries. The Royal Palace
          traditionally patronized silversmiths' workshops, and silversmiths
          remain concentrated at Kompong Luong, near the former royal capital
          Oudong. Silver was made into a variety of items, including weaponry,
          coins, ceremonial objects used in funerary and religious rituals, and
          betel boxes. During Cambodia's colonial period, artisans at the School
          of Fine Art produced celebrated silverwork, and by the late 1930s
          there were more than 600 silversmiths. Today, silverwork is popular
          for boxes, jewellery, and souvenir items; these are often adorned with
          fruit, fire, and Angkor-inspired motifs. Men produce most of the forms
          for such work, but women often complete the intricate filigree.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710817/social-impact/s11_lbsh8u.jpg?tr=h-384,fo-auto`,
          heading: '+ Ceramics',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>Cambodian pottery traditions date to 5000 BCE. Ceramics were mostly
          used for domestic purposes such as holding food and water. There is no
          evidence that Khmer ceramics were ever exported, though ceramics were
          imported from elsewhere in Asia beginning in the 10th century.
          Ceramics in the shape of birds, elephants, rabbits, and other animals
          were popular between the 11th and 13th centuries.</li>

          <li>Potting traditionally was done either on a pottery wheel or using
          shaping tools such as paddles and anvils. Firing was done in clay
          kilns, which could reach temperatures of 1,000–1,200 °C, or in the
          open air, at temperatures of around 700 °C. Primarily green and brown
          glazes were used. In rural Cambodia, traditional pottery methods
          remained. Many pieces are hand-turned and fired on an open fire
          without glaze. The country's major center for pottery is Kompong
          Chhnang Province.</li>

          <li>In modern Cambodia, the art of glazed ceramics faded into oblivion:
          the technique of stoneware stops to be used around 14th century, at
          the end of Angkor era. Today this technique begins a slow revival
          through a Belgian ceramist who founded the Khmer Ceramics & Fine Arts
          Center, in Siem Reap, the organization lead vocational training and
          researches about this lost skill.</li>
          </ul>`,
        },
        {
          img1: `https://res.cloudinary.com/anne-biz/image/upload/v1632710821/social-impact/s12_squyd1.jpg?tr=h-384,fo-auto`,
          heading: '+ The Cambodian Stegosaurus',
          data: `<ul class="space-y-2.5 sm:space-y-5">
          <li>There is a creature depicted in a little picture on the Angkor Wat
          which some have said resembles a Stegosaurus. Others have pointed out
          that it looks more like a chameleon [11] or a Mountain Horned Dragon
          [12], both found in that area.</li>

          <li>Cambodian Handicrafts made from Rattan, Bamboo, Palm Tree-Shopping
          Khmer Handicrafts In this video, I went shopping to Cambodian/Khmer
          handicrafts shop and in the video, I wanted to share you what are the
          local handicrafts in Cambodian which mostly made from rattan, bamboo,
          palm tree.</li>
          </ul>`,
        },
      ],
    }
  },
}
</script>

<style scoped>
h5 {
  @apply text-lg sm:text-xl font-bold tracking-wide;
}
p {
  @apply text-sm leading-loose;
}
</style>
