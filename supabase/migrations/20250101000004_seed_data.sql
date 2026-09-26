-- ============================================================
-- OceanFresh Fish — Seed data
-- ============================================================
-- Migrates the site's existing static demo content (previously
-- hardcoded in src/data/*.ts) into the new tables, so the public
-- site looks and reads exactly the same immediately after this
-- migration runs — nothing here is invented; every English value
-- is copied verbatim from the current src/data files. Where the
-- static data had no Hindi value, hi columns are left as '' and
-- should be filled in from the admin panel.
--
-- Uses `$$...$$` dollar-quoting throughout instead of '...' so
-- none of the apostrophes in the copy need manual escaping.
-- ============================================================

-- ------------------------------------------------------------
-- business_settings (single row)
-- ------------------------------------------------------------
insert into public.business_settings (
  business_name, tagline_en, tagline_hi, description_en, description_hi,
  phone, whatsapp_number, email, address, city, state, postal_code, country,
  currency_symbol, opening_hours, google_maps_url, instagram_url, facebook_url, youtube_url,
  default_language
) values (
  $$OceanFresh Fish$$,
  $$Freshness You Can Trust$$,
  $$ऐसी ताज़गी जिस पर आप भरोसा कर सकें$$,
  $$OceanFresh Fish brings you honest, hand-selected fresh fish and seafood — cleaned to order and delivered with care. This is demo placeholder content for a temporary business name; replace it with your real story.$$,
  $$OceanFresh Fish आपके लिए लाता है ईमानदारी से चुनी गई ताज़ी मछली और सीफ़ूड — ऑर्डर के अनुसार साफ़ की गई और सावधानी से पहुँचाई गई। यह एक अस्थायी व्यवसाय नाम के लिए डेमो सामग्री है; इसे अपनी असली कहानी से बदलें।$$,
  $$+911234567890$$,
  $$+911234567890$$,
  $$hello@oceanfreshfish.example$$,
  $$12 Harbour Market Road$$,
  $$Your City$$,
  $$Your State$$,
  $$000000$$,
  $$India$$,
  $$₹$$,
  $$[{"days": "Monday – Saturday", "hours": "6:00 AM – 8:00 PM"}, {"days": "Sunday", "hours": "7:00 AM – 2:00 PM"}]$$::jsonb,
  $$$$,
  $$$$,
  $$$$,
  $$$$,
  'en'
);

-- ------------------------------------------------------------
-- owner (single active row)
-- ------------------------------------------------------------
insert into public.owner (
  name_en, name_hi, role_en, role_hi, bio_en, bio_hi, image_url, instagram_url, active
) values (
  $$Demo Owner Name$$,
  $$$$,
  $$Founder$$,
  $$$$,
  $$I grew up around the harbour and started this counter to bring the same fish my own family trusts to yours — hand-picked every morning, no shortcuts. Placeholder bio — replace with the real owner's story.$$,
  $$मैं बंदरगाह के आस-पास बड़ा हुआ और यही भरोसेमंद मछली अब आपके परिवार तक पहुँचाने के लिए यह काउंटर शुरू किया — हर सुबह हाथ से चुनी गई, बिना किसी शॉर्टकट के। यह एक नमूना परिचय है — असली मालिक की कहानी से बदलें।$$,
  $$/images/owner/owner.svg$$,
  $$$$,
  true
);

-- ------------------------------------------------------------
-- fish
-- ------------------------------------------------------------
insert into public.fish (
  slug, name_en, name_hi, short_description_en, short_description_hi,
  description_en, description_hi, freshness_note_en, freshness_note_hi,
  price, price_unit, image_url, availability, featured, display_order
) values
(
  $$rohu$$, $$Rohu$$, $$रोहू$$,
  $$A household favourite — soft, mild-flavoured river fish.$$,
  $$घर-घर की पसंद — नरम, हल्के स्वाद वाली नदी की मछली।$$,
  $$Rohu is a delicately flavoured freshwater fish, prized for its soft texture and versatility. It works beautifully in traditional curries, fries, or a simple home-style preparation. Each fish is hand-selected for firmness and clear, bright eyes before it reaches our counter.$$,
  $$रोहू एक हल्के स्वाद वाली मीठे पानी की मछली है, जो अपनी नरम बनावट और बहुमुखी उपयोग के लिए पसंद की जाती है। यह पारंपरिक करी, फ्राई या घर के सामान्य पकवान में बेहद स्वादिष्ट लगती है। हमारे काउंटर तक पहुँचने से पहले हर मछली को मज़बूती और साफ़, चमकदार आँखों के आधार पर हाथ से चुना जाता है।$$,
  $$Sourced fresh daily. Cleaned and scaled on request at no extra cost.$$,
  $$रोज़ ताज़ा लाई जाती है। बिना किसी अतिरिक्त शुल्क के अनुरोध पर साफ़ और स्केल की जाती है।$$,
  450.00, $$kg$$, $$/images/fish/rohu.svg$$, true, true, 1
),
(
  $$katla$$, $$Katla$$, $$कतला$$,
  $$Firm, meaty freshwater fish, great for rich curries.$$,
  $$मज़बूत, मांसल मीठे पानी की मछली, गाढ़ी करी के लिए बेहतरीन।$$,
  $$Katla is known for its firm, meaty flesh that holds together well in slow-cooked curries and gravies. A staple across many home kitchens, it's a reliable choice for family meals that need to feed a crowd.$$,
  $$कतला अपने मज़बूत, मांसल गूदे के लिए जानी जाती है जो धीमी आँच पर पकी करी और ग्रेवी में अच्छी तरह बना रहता है। कई घरों की रसोई में यह एक मुख्य विकल्प है, बड़े परिवार के भोजन के लिए एक भरोसेमंद पसंद।$$,
  $$Delivered fresh from the local harbour every morning.$$,
  $$हर सुबह स्थानीय बंदरगाह से ताज़ा पहुँचाई जाती है।$$,
  420.00, $$kg$$, $$/images/fish/katla.svg$$, true, true, 2
),
(
  $$hilsa$$, $$Hilsa$$, $$हिल्सा$$,
  $$The prized seasonal favourite, rich and full of flavour.$$,
  $$मौसमी पसंदीदा, गाढ़ी और स्वाद से भरपूर।$$,
  $$Hilsa (Ilish) is celebrated for its rich, buttery flavour and is considered a delicacy in many regional cuisines. Best enjoyed steamed in mustard sauce or lightly fried, it's a seasonal treat we source carefully to guarantee freshness.$$,
  $$हिल्सा (इलिश) अपने गाढ़े, मक्खन जैसे स्वाद के लिए जानी जाती है और कई क्षेत्रीय व्यंजनों में इसे विशेष माना जाता है। सरसों की ग्रेवी में भाप में पकाकर या हल्का फ्राई करके इसका सबसे अच्छा स्वाद मिलता है — यह एक मौसमी विशेष मछली है जिसे हम ताज़गी सुनिश्चित करने के लिए सावधानी से लाते हैं।$$,
  $$Seasonal availability — call ahead to confirm today's stock.$$,
  $$मौसमी उपलब्धता — आज का स्टॉक जानने के लिए पहले से कॉल करें।$$,
  900.00, $$kg$$, $$/images/fish/hilsa.svg$$, true, true, 3
),
(
  $$prawns$$, $$Prawns$$, $$झींगा$$,
  $$Plump, fresh-water prawns cleaned and deveined on request.$$,
  $$मोटे, मीठे पानी के झींगे, अनुरोध पर साफ़ और नस निकाले हुए।$$,
  $$Our prawns are sorted by size and kept on ice from harvest to counter. Whether you're making a quick stir-fry or a festive prawn curry, we clean and devein them on request so you can start cooking right away.$$,
  $$हमारे झींगों को आकार के अनुसार छाँटा जाता है और पकड़ से लेकर काउंटर तक बर्फ़ पर रखा जाता है। चाहे झटपट स्टिर-फ्राई बनानी हो या उत्सव की झींगा करी, हम अनुरोध पर उन्हें साफ़ और नस-रहित कर देते हैं ताकि आप तुरंत खाना बनाना शुरू कर सकें।$$,
  $$Cleaned and deveined on request. Available in small and jumbo sizes.$$,
  $$अनुरोध पर साफ़ और नस-रहित किए जाते हैं। छोटे और जंबो आकार में उपलब्ध।$$,
  600.00, $$kg$$, $$/images/fish/prawns.svg$$, true, true, 4
),
(
  $$pomfret$$, $$Pomfret$$, $$पॉम्फ्रेट$$,
  $$Delicate white-fleshed fish, perfect for frying or grilling.$$,
  $$नाज़ुक सफ़ेद गूदे वाली मछली, फ्राई या ग्रिल के लिए एकदम सही।$$,
  $$Pomfret's delicate, boneless-feeling white flesh makes it one of the most sought-after fish for frying, grilling, or a light tawa-fry with simple spices. We keep a close eye on size and freshness for every batch.$$,
  $$पॉम्फ्रेट का नाज़ुक, लगभग बिना काँटे वाला सफ़ेद गूदा इसे फ्राई, ग्रिल या साधारण मसालों के साथ हल्के तवा-फ्राई के लिए सबसे पसंदीदा मछलियों में से एक बनाता है। हर खेप के आकार और ताज़गी पर हमारी पूरी नज़र रहती है।$$,
  $$Available whole or pre-cut into steaks on request.$$,
  $$पूरी या अनुरोध पर पहले से स्टेक में कटी हुई उपलब्ध।$$,
  700.00, $$kg$$, $$/images/fish/pomfret.svg$$, true, false, 5
),
(
  $$surmai$$, $$Surmai$$, $$सुरमई$$,
  $$Kingfish steaks — firm texture, minimal bones.$$,
  $$किंगफ़िश स्टेक — मज़बूत बनावट, बहुत कम काँटे।$$,
  $$Surmai (Kingfish) is a firm, almost boneless fish that's ideal for pan-frying or tandoor-style preparations. Cut into steaks of your preferred thickness, it's a favourite for special weekend meals.$$,
  $$सुरमई (किंगफ़िश) एक मज़बूत, लगभग बिना काँटे वाली मछली है जो पैन-फ्राई या तंदूरी शैली के लिए आदर्श है। आपकी पसंद की मोटाई में स्टेक काटी जाती है — विशेष सप्ताहांत भोजन के लिए पसंदीदा।$$,
  $$Cut into steaks to your preferred thickness on request.$$,
  $$अनुरोध पर आपकी पसंद की मोटाई में स्टेक काटी जाती है।$$,
  800.00, $$kg$$, $$/images/fish/surmai.svg$$, true, false, 6
),
(
  $$tilapia$$, $$Tilapia$$, $$तिलापिया$$,
  $$Mild, easy-to-cook fish, great for everyday meals.$$,
  $$हल्की, आसानी से पकने वाली मछली, रोज़मर्रा के भोजन के लिए बढ़िया।$$,
  $$Tilapia's mild flavour and quick cooking time make it a practical everyday choice. It takes on marinades and spices well, making it a flexible option for weeknight dinners.$$,
  $$तिलापिया का हल्का स्वाद और जल्दी पकने का गुण इसे रोज़ के लिए एक व्यावहारिक विकल्प बनाता है। यह मैरिनेड और मसालों को अच्छी तरह सोखती है, जिससे यह हफ़्ते के दिनों के खाने के लिए एक लचीला विकल्प बनती है।$$,
  $$Farm-raised and inspected fresh before sale.$$,
  $$फ़ार्म में पाली गई और बिक्री से पहले ताज़गी की जाँच की गई।$$,
  380.00, $$kg$$, $$/images/fish/tilapia.svg$$, true, false, 7
),
(
  $$basa$$, $$Basa$$, $$बासा$$,
  $$Soft, boneless fillets — ideal for quick, fuss-free cooking.$$,
  $$नरम, बिना काँटे वाले फ़िलेट — झटपट और आसान खाना पकाने के लिए आदर्श।$$,
  $$Basa fillets are soft, nearly boneless, and cook quickly — a convenient option for anyone who wants a fuss-free fish meal without the hassle of bones or scaling.$$,
  $$बासा के फ़िलेट नरम, लगभग बिना काँटे के होते हैं और जल्दी पक जाते हैं — काँटों या स्केलिंग की परेशानी के बिना आसान मछली भोजन चाहने वालों के लिए सुविधाजनक विकल्प।$$,
  $$Currently out of stock — check back soon or ask us directly.$$,
  $$फ़िलहाल स्टॉक में नहीं है — जल्द ही दोबारा देखें या सीधे हमसे पूछें।$$,
  350.00, $$kg$$, $$/images/fish/basa.svg$$, false, false, 8
);

-- ------------------------------------------------------------
-- offers
-- ------------------------------------------------------------
insert into public.offers (
  title_en, title_hi, description_en, description_hi, discount_text_en, discount_text_hi,
  image_url, active, featured, display_order
) values
(
  $$Weekend Fresh Catch$$, $$सप्ताहांत की ताज़ी पकड़$$,
  $$Special prices on select fresh fish, available Saturday and Sunday. Message us on WhatsApp for today's list.$$,
  $$शनिवार और रविवार को चुनिंदा ताज़ी मछली पर विशेष कीमतें। आज की सूची के लिए हमें व्हाट्सएप करें।$$,
  $$This Weekend$$, $$इस सप्ताहांत$$,
  $$/images/offers/weekend-catch.svg$$, true, true, 1
),
(
  $$Bulk Order Discount$$, $$थोक ऑर्डर पर छूट$$,
  $$Ordering for a family gathering or event? Ask about discounted rates on bulk orders of 5kg and above.$$,
  $$पारिवारिक आयोजन या समारोह के लिए ऑर्डर कर रहे हैं? 5 किलो और उससे अधिक के थोक ऑर्डर पर छूट के बारे में पूछें।$$,
  $$Bulk Orders$$, $$थोक ऑर्डर$$,
  $$/images/offers/bulk-order.svg$$, true, false, 2
),
(
  $$Festive Special$$, $$त्योहारी विशेष$$,
  $$Seasonal fish like Hilsa are stocked in limited quantities during festive weeks — reserve yours in advance.$$,
  $$हिल्सा जैसी मौसमी मछली त्योहारी हफ़्तों में सीमित मात्रा में उपलब्ध होती है — पहले से अपनी बुकिंग करवाएं।$$,
  $$Limited$$, $$सीमित$$,
  $$$$, false, false, 3
);

-- ------------------------------------------------------------
-- videos
-- ------------------------------------------------------------
insert into public.videos (
  title_en, title_hi, description_en, description_hi, video_url, poster_url,
  video_type, active, featured, display_order
) values
(
  $$How We Select Our Fish$$, $$हम मछली कैसे चुनते हैं$$,
  $$A look at how each fish is hand-picked at the harbour every morning.$$,
  $$हर सुबह बंदरगाह पर हर मछली को हाथ से कैसे चुना जाता है, इसकी एक झलक।$$,
  $$/videos/selection.mp4$$, $$/images/videos/selection.svg$$, $$uploaded$$, true, true, 1
),
(
  $$Cleaning & Preparation$$, $$सफ़ाई और तैयारी$$,
  $$Careful cleaning and cutting, exactly to order.$$,
  $$अनुरोध के अनुसार सावधानीपूर्वक सफ़ाई और कटाई।$$,
  $$/videos/cleaning.mp4$$, $$/images/videos/cleaning.svg$$, $$uploaded$$, true, false, 2
),
(
  $$Packaging & Handover$$, $$पैकेजिंग और सुपुर्दगी$$,
  $$Packed with care so freshness travels with you.$$,
  $$सावधानी से पैक किया गया ताकि ताज़गी आपके साथ जाए।$$,
  $$/videos/packaging.mp4$$, $$/images/videos/packaging.svg$$, $$uploaded$$, true, false, 3
);

-- ------------------------------------------------------------
-- reels
-- ------------------------------------------------------------
insert into public.reels (
  title_en, title_hi, caption_en, caption_hi, video_url, thumbnail_url,
  platform, social_url, active, display_order
) values
(
  $$This Morning's Catch$$, $$आज सुबह की पकड़$$,
  $$Fresh off the boat and onto the counter within the hour.$$,
  $$नाव से उतरकर एक घंटे के भीतर काउंटर तक।$$,
  $$/videos/social/reel-1.mp4$$, $$/images/social/reel-1.svg$$, $$instagram$$, $$$$, true, 1
),
(
  $$Cleaning Made Easy$$, $$आसान सफ़ाई$$,
  $$Watch how quickly we clean and prep your order.$$,
  $$देखें हम आपका ऑर्डर कितनी जल्दी साफ़ और तैयार करते हैं।$$,
  $$/videos/social/reel-2.mp4$$, $$/images/social/reel-2.svg$$, $$instagram$$, $$$$, true, 2
),
(
  $$Weekend Market Vibes$$, $$सप्ताहांत बाज़ार का माहौल$$,
  $$Saturday mornings at the counter are always busy.$$,
  $$शनिवार की सुबहें काउंटर पर हमेशा व्यस्त रहती हैं।$$,
  $$/videos/social/reel-3.mp4$$, $$/images/social/reel-3.svg$$, $$instagram$$, $$$$, true, 3
);

-- ------------------------------------------------------------
-- faqs
-- ------------------------------------------------------------
insert into public.faqs (question_en, question_hi, answer_en, answer_hi, active, display_order)
values
(
  $$How fresh is the fish?$$, $$मछली कितनी ताज़ी है?$$,
  $$We source fish daily from trusted local suppliers and harbours. Nothing sits in storage for long — what you see is typically what arrived that morning or the evening before.$$,
  $$हम रोज़ भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों से मछली लाते हैं। कुछ भी लंबे समय तक भंडारण में नहीं रहता — जो आप देखते हैं वह आमतौर पर उसी सुबह या पिछली शाम आया होता है।$$,
  true, 1
),
(
  $$Do you clean the fish?$$, $$क्या आप मछली साफ़ करते हैं?$$,
  $$Yes. Cleaning and scaling are available on request at no extra cost. Just let us know your preference when you message us or visit.$$,
  $$जी हाँ। बिना किसी अतिरिक्त शुल्क के अनुरोध पर सफ़ाई और स्केलिंग उपलब्ध है। बस संदेश भेजते या आते समय अपनी पसंद बता दें।$$,
  true, 2
),
(
  $$Do you provide cutting options?$$, $$क्या आप काटने के विकल्प देते हैं?$$,
  $$Absolutely — we can cut fish into steaks, fillets, or curry-cut pieces depending on the variety and your recipe.$$,
  $$बिल्कुल — हम मछली की किस्म और आपकी रेसिपी के अनुसार स्टेक, फ़िलेट या करी-कट टुकड़ों में काट सकते हैं।$$,
  true, 3
),
(
  $$Which areas do you serve?$$, $$आप किन क्षेत्रों में सेवा देते हैं?$$,
  $$We currently serve our local city and a few nearby areas. See the Service Areas section for the full, up-to-date list, or message us to confirm your location.$$,
  $$हम फ़िलहाल अपने स्थानीय शहर और कुछ आस-पास के क्षेत्रों में सेवा देते हैं। पूरी, अद्यतन सूची के लिए सेवा क्षेत्र अनुभाग देखें, या अपने स्थान की पुष्टि के लिए हमें संदेश भेजें।$$,
  true, 4
),
(
  $$How can I check today's price?$$, $$मैं आज की कीमत कैसे जान सकता हूँ?$$,
  $$Prices can vary slightly day to day depending on the catch. Message us on WhatsApp or call for the most accurate, up-to-date pricing before you visit.$$,
  $$पकड़ के अनुसार कीमतें दिन-प्रतिदिन थोड़ी बदल सकती हैं। आने से पहले सबसे सटीक, अद्यतन कीमत के लिए हमें व्हाट्सएप पर संदेश भेजें या कॉल करें।$$,
  true, 5
);

-- ------------------------------------------------------------
-- testimonials (demo placeholders — not real reviews)
-- ------------------------------------------------------------
insert into public.testimonials (customer_name, role_en, role_hi, content_en, content_hi, rating, active, display_order)
values
(
  $$Demo Customer A$$, $$Regular Customer$$, $$नियमित ग्राहक$$,
  $$The fish is always fresh and the team cleans it exactly the way I ask. Placeholder testimonial — replace with a real review.$$,
  $$मछली हमेशा ताज़ी होती है और टीम बिल्कुल मेरी पसंद के अनुसार साफ़ करती है। यह एक नमूना समीक्षा है — असली समीक्षा से बदलें।$$,
  5, true, 1
),
(
  $$Demo Customer B$$, $$Home Chef$$, $$होम शेफ़$$,
  $$I appreciate being able to check availability on WhatsApp before heading over. Placeholder testimonial — replace with a real review.$$,
  $$आने से पहले व्हाट्सएप पर उपलब्धता जान पाना मुझे बहुत पसंद है। यह एक नमूना समीक्षा है — असली समीक्षा से बदलें।$$,
  5, true, 2
),
(
  $$Demo Customer C$$, $$Weekly Buyer$$, $$साप्ताहिक खरीदार$$,
  $$Consistent quality every week — this is sample text until real feedback is added. Placeholder testimonial — replace with a real review.$$,
  $$हर हफ़्ते एक जैसी गुणवत्ता — असली प्रतिक्रिया जोड़े जाने तक यह नमूना पाठ है। असली समीक्षा से बदलें।$$,
  4, true, 3
);

-- ------------------------------------------------------------
-- service_areas
-- ------------------------------------------------------------
insert into public.service_areas (name_en, name_hi, active, display_order)
values
  ($$Your City$$, $$आपका शहर$$, true, 1),
  ($$Your Area$$, $$आपका इलाका$$, true, 2),
  ($$Nearby Areas$$, $$आस-पास के इलाके$$, true, 3),
  ($$Downtown District$$, $$डाउनटाउन क्षेत्र$$, true, 4),
  ($$Harbour Side$$, $$बंदरगाह क्षेत्र$$, true, 5);

-- ------------------------------------------------------------
-- homepage_content
-- ------------------------------------------------------------
insert into public.homepage_content (section_key, content) values
(
  $$hero$$,
  $${
    "eyebrow": {"en": "Fresh Every Day · Carefully Selected", "hi": "रोज़ ताज़ी · सावधानी से चुनी गई"},
    "headline_line1": {"en": "Fresh Fish.", "hi": "ताज़ी मछली।"},
    "headline_line2": {"en": "Honest Quality.", "hi": "ईमानदार गुणवत्ता।"},
    "subheading": {"en": "Freshly selected fish for everyday meals, prepared with care.", "hi": "रोज़मर्रा के खाने के लिए सावधानी से तैयार, ताज़ी चुनी हुई मछली।"},
    "cta_primary_label": {"en": "Explore Fresh Fish", "hi": "ताज़ी मछली देखें"},
    "cta_secondary_label": {"en": "WhatsApp Us", "hi": "व्हाट्सएप करें"}
  }$$::jsonb
),
(
  $$freshness_promise$$,
  $${
    "eyebrow": {"en": "Our Promise", "hi": "हमारा वादा"},
    "heading": {"en": "Freshness is not a slogan. It's how we work.", "hi": "ताज़गी एक नारा नहीं, हमारा तरीक़ा है।"},
    "statement": {"en": "We don't sell what we wouldn't serve at our own table — checked, cleaned, and handed to you the same day it arrives.", "hi": "हम वह नहीं बेचते जो अपनी ही मेज़ पर न परोसें — जाँची, साफ़ की गई, और आने के उसी दिन आपको सौंपी गई।"}
  }$$::jsonb
),
(
  $$process$$,
  $${
    "eyebrow": {"en": "From Water to Your Table", "hi": "पानी से आपकी थाली तक"},
    "heading": {"en": "How Every Order Reaches You", "hi": "हर ऑर्डर आप तक कैसे पहुँचता है"},
    "description": {"en": "A simple, careful process behind every piece of fish we sell.", "hi": "हर मछली के पीछे एक सरल, सावधानीपूर्ण प्रक्रिया।"},
    "steps": [
      {
        "icon": "selected",
        "title": {"en": "Selection", "hi": "चयन"},
        "description": {"en": "Every morning, fish is hand-picked at the harbour for firmness and clarity of the eyes.", "hi": "हर सुबह, बंदरगाह पर मज़बूती और आँखों की स्पष्टता देखकर मछली हाथ से चुनी जाती है।"}
      },
      {
        "icon": "quality",
        "title": {"en": "Quality Check", "hi": "गुणवत्ता जाँच"},
        "description": {"en": "Each batch is checked for smell, texture, and freshness before it reaches the counter.", "hi": "काउंटर तक पहुँचने से पहले हर खेप की गंध, बनावट और ताज़गी जाँची जाती है।"}
      },
      {
        "icon": "fresh",
        "title": {"en": "Cleaning & Preparation", "hi": "सफ़ाई और तैयारी"},
        "description": {"en": "Cleaned, scaled, and cut to order — exactly the way you need it for your recipe.", "hi": "आपके अनुरोध पर साफ़, स्केल और कटी हुई — बिल्कुल आपकी रेसिपी के अनुसार।"}
      },
      {
        "icon": "contact",
        "title": {"en": "Handover", "hi": "सुपुर्दगी"},
        "description": {"en": "Packed with care and handed to you the same day — fresh from counter to kitchen.", "hi": "सावधानी से पैक करके उसी दिन आपको सौंपी गई — काउंटर से सीधे आपकी रसोई तक ताज़ा।"}
      }
    ]
  }$$::jsonb
),
(
  $$about$$,
  $${
    "eyebrow": {"en": "Our Story", "hi": "हमारी कहानी"},
    "heading": {"en": "Freshness is a promise, not a slogan.", "hi": "ताज़गी एक वादा है, नारा नहीं।"},
    "paragraphs": {
      "en": [
        "OceanFresh Fish started with a simple idea: fish should taste like it was caught this morning, because it usually was. We work directly with trusted local suppliers and harbours to bring in fish and seafood daily, not weekly.",
        "Every fish that reaches our counter is checked for firmness, clarity of the eyes, and smell before it's offered for sale. If it doesn't meet our standard, it doesn't go out.",
        "Hygiene and careful handling matter as much as freshness. From ice-packed transport to clean cutting boards, every step is designed to protect quality until it reaches your kitchen."
      ],
      "hi": [
        "OceanFresh Fish की शुरुआत एक सरल विचार से हुई: मछली का स्वाद ऐसा होना चाहिए जैसे वह आज सुबह ही पकड़ी गई हो — क्योंकि अक्सर वह होती भी वैसी ही है। हम रोज़ (साप्ताहिक नहीं) मछली और सीफ़ूड लाने के लिए भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों के साथ सीधे काम करते हैं।",
        "हमारे काउंटर तक पहुँचने वाली हर मछली को बिक्री से पहले मज़बूती, आँखों की स्पष्टता और गंध के आधार पर जाँचा जाता है। अगर यह हमारे मानक पर खरी नहीं उतरती, तो बाहर नहीं जाती।",
        "स्वच्छता और सावधानीपूर्ण संभाल भी ताज़गी जितनी ही मायने रखती है। बर्फ़ में पैक परिवहन से लेकर साफ़ कटिंग बोर्ड तक, हर कदम आपकी रसोई तक गुणवत्ता की रक्षा के लिए बनाया गया है।"
      ]
    },
    "image_url": "/images/about/about-fresh-selection.svg",
    "image_alt": "Hand-selected fresh fish being prepared for sale"
  }$$::jsonb
),
(
  $$why_choose_us$$,
  $${
    "eyebrow": {"en": "Why Choose Us", "hi": "हमें क्यों चुनें"},
    "heading": {"en": "A Standard You Can Taste", "hi": "एक स्तर जिसे आप चख सकते हैं"},
    "items": [
      {
        "icon": "fresh",
        "title": {"en": "Fresh Every Day", "hi": "रोज़ ताज़ी"},
        "description": {"en": "New stock arrives daily — nothing lingers in storage.", "hi": "रोज़ नया स्टॉक आता है — कुछ भी भंडारण में नहीं रुकता।"}
      },
      {
        "icon": "quality",
        "title": {"en": "Quality You Can Trust", "hi": "भरोसेमंद गुणवत्ता"},
        "description": {"en": "Every fish is checked for firmness, clarity, and smell.", "hi": "हर मछली को मज़बूती, स्पष्टता और गंध के लिए जाँचा जाता है।"}
      },
      {
        "icon": "selected",
        "title": {"en": "Carefully Selected", "hi": "सावधानी से चुनी गई"},
        "description": {"en": "Sourced from trusted local suppliers and harbours.", "hi": "भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों से लाई गई।"}
      },
      {
        "icon": "contact",
        "title": {"en": "Easy to Contact", "hi": "आसान संपर्क"},
        "description": {"en": "Reach us instantly on WhatsApp, call, or social media.", "hi": "व्हाट्सएप, कॉल या सोशल मीडिया पर तुरंत हमसे जुड़ें।"}
      }
    ]
  }$$::jsonb
),
(
  $$final_cta$$,
  $${
    "heading": {"en": "Can't decide what's freshest today?", "hi": "तय नहीं कर पा रहे आज क्या सबसे ताज़ा है?"},
    "description": {"en": "Message {business} directly on WhatsApp — we'll tell you exactly what came in this morning.", "hi": "{business} को सीधे व्हाट्सएप पर संदेश भेजें — हम बताएंगे आज सुबह वास्तव में क्या आया है।"}
  }$$::jsonb
);
