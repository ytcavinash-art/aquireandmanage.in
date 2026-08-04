import os
from PIL import Image, ImageDraw, ImageFont

# Canvas dimension (16:9 1080p slide)
W, H = 1920, 1080

# Colors
NAVY = (6, 16, 46)
CRIMSON = (200, 16, 46)
WHITE = (255, 255, 255)
LIGHT_BG = (248, 250, 252)
SLATE_DARK = (30, 41, 59)
SLATE_MUTED = (100, 116, 139)
SLATE_BORDER = (226, 232, 240)
CARD_BG = (255, 255, 255)

# Load fonts
try:
    font_hero = ImageFont.truetype("arialbd.ttf", 64)
    font_title = ImageFont.truetype("arialbd.ttf", 46)
    font_subtitle = ImageFont.truetype("arialbd.ttf", 32)
    font_body = ImageFont.truetype("arial.ttf", 22)
    font_body_bold = ImageFont.truetype("arialbd.ttf", 22)
    font_small = ImageFont.truetype("arial.ttf", 18)
    font_badge = ImageFont.truetype("arialbd.ttf", 16)
    font_cover = ImageFont.truetype("arialbd.ttf", 52)
    font_card_title = ImageFont.truetype("arialbd.ttf", 27)
    font_contact = ImageFont.truetype("arial.ttf", 24)
except Exception:
    font_hero = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()
    font_body = ImageFont.load_default()
    font_body_bold = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_badge = ImageFont.load_default()
    font_cover = ImageFont.load_default()
    font_card_title = ImageFont.load_default()
    font_contact = ImageFont.load_default()

def wrap_text(draw, text, font, max_width):
    """Wrap text by rendered pixel width without splitting words."""
    lines = []
    for paragraph in text.splitlines() or ['']:
        words = paragraph.split()
        if not words:
            lines.append('')
            continue
        line = words[0]
        for word in words[1:]:
            candidate = f"{line} {word}"
            if draw.textlength(candidate, font=font) <= max_width:
                line = candidate
            else:
                lines.append(line)
                line = word
        lines.append(line)
    return lines

def draw_wrapped_text(draw, xy, text, font, fill, max_width, line_spacing=8):
    """Draw wrapped text and return the next available vertical position."""
    x, y = xy
    bbox = draw.textbbox((0, 0), "Ag", font=font)
    line_height = (bbox[3] - bbox[1]) + line_spacing
    for line in wrap_text(draw, text, font, max_width):
        draw.text((x, y), line, fill=fill, font=font)
        y += line_height
    return y

def load_and_contain(path, max_w, max_h):
    if not os.path.exists(path):
        return None
    try:
        img = Image.open(path).convert("RGBA")
        img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        return img
    except Exception:
        return None

def load_and_cover(path, target_w, target_h):
    if not os.path.exists(path):
        return None
    try:
        img = Image.open(path).convert("RGB")
        iw, ih = img.size
        scale = max(target_w / iw, target_h / ih)
        nw, nh = int(iw * scale), int(ih * scale)
        img = img.resize((nw, nh), Image.Resampling.LANCZOS)
        left = (nw - target_w) // 2
        top = (nh - target_h) // 2
        return img.crop((left, top, left + target_w, top + target_h))
    except Exception:
        return None

def draw_header(draw, img, title_text):
    # Header banner
    draw.rectangle([0, 0, W, 100], fill=WHITE)
    draw.line([0, 100, W, 100], fill=SLATE_BORDER, width=2)
    
    # Logo
    logo = load_and_contain('aquiretested/images/am-logo.png', 180, 60)
    if logo:
        img.paste(logo, (80, 20), logo)
    else:
        draw.text((80, 30), "A&M ADVISORY", fill=NAVY, font=font_subtitle)
        
    # Title
    draw.text((W - 80 - draw.textlength(title_text, font=font_subtitle), 32), title_text, fill=NAVY, font=font_subtitle)
    
    # Bottom Bar Accent
    draw.rectangle([0, H - 20, W // 2, H], fill=CRIMSON)
    draw.rectangle([W // 2, H - 20, W, H], fill=NAVY)

slides = []

# --- SLIDE 1: Cover Slide ---
img1 = Image.new("RGB", (W, H), LIGHT_BG)
draw1 = ImageDraw.Draw(img1)

# Background image if available
bg1 = load_and_cover('aquiretested/images/sra-project-optimized.jpg', W, H)
if bg1:
    # Dim background
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Brightness(bg1)
    bg1 = enhancer.enhance(0.35)
    img1.paste(bg1, (0, 0))
    draw1 = ImageDraw.Draw(img1)
else:
    draw1.rectangle([0, 0, W, H], fill=NAVY)

# White content card on left
draw1.rectangle([120, 150, 1000, 930], fill=WHITE)
draw1.rectangle([110, 150, 120, 930], fill=CRIMSON)

logo1 = load_and_contain('aquiretested/images/am-logo.png', 320, 120)
if logo1:
    img1.paste(logo1, (180, 220), logo1)
else:
    draw1.text((180, 220), "A&M ADVISORY", fill=NAVY, font=font_hero)

draw_wrapped_text(draw1, (180, 420), "Advisory Excellence", font_hero, NAVY, 760, 8)
draw_wrapped_text(draw1, (180, 520), "Building The Future Together", font_cover, CRIMSON, 760, 6)

draw_wrapped_text(draw1, (180, 680), "MUMBAI SRA REDEVELOPMENT & CORPORATE ADVISORY", font_body_bold, SLATE_MUTED, 760, 5)
draw_wrapped_text(draw1, (180, 730), "Official Corporate Company Profile & Capability Deck", font_body_bold, SLATE_DARK, 760, 5)

slides.append(img1)

# --- SLIDE 2: About Us ---
img2 = Image.new("RGB", (W, H), LIGHT_BG)
draw2 = ImageDraw.Draw(img2)
draw_header(draw2, img2, "About Us")

draw2.text((100, 140), "About A&M Advisory", fill=NAVY, font=font_title)

# Card 1
draw2.rectangle([100, 220, W - 100, 420], fill=WHITE, outline=SLATE_BORDER, width=2)
p1 = ("A&M Private Limited specializes in end-to-end advisory and execution support for Slum Rehabilitation Authority "
      "(SRA) projects in Mumbai. We play a vital role in managing the entire project lifecycle—from initial surveys and "
      "documentation to approvals, coordination, and final handover.")
draw2.text((140, 260), "End-to-End SRA Project Management", fill=CRIMSON, font=font_subtitle)
draw_wrapped_text(draw2, (140, 310), p1, font_body, SLATE_DARK, 1640, 7)

# Card 2
draw2.rectangle([100, 450, W - 100, 670], fill=WHITE, outline=SLATE_BORDER, width=2)
p2 = ("Our expertise lies in liaisoning with government authorities, ensuring compliance with SRA regulations, and "
      "facilitating seamless communication between developers, societies, and stakeholders. With a strong focus on "
      "transparency, efficiency, and accountability, we help transform redevelopment visions into successful, legally "
      "compliant, and socially impactful outcomes.")
draw2.text((140, 490), "Regulatory Expertise & Stakeholder Bridge", fill=NAVY, font=font_subtitle)
draw_wrapped_text(draw2, (140, 540), p2, font_body, SLATE_DARK, 1640, 7)

# Card 3
draw2.rectangle([100, 700, W - 100, 880], fill=WHITE, outline=SLATE_BORDER, width=2)
p3 = ("Driven by Advisory Excellence, we are committed to Building The Future Together by contributing to structured "
      "urban development and improved living standards across the Mumbai Metropolitan Region (MMR).")
draw2.text((140, 740), "Commitment to Sustainable Urban Growth", fill=CRIMSON, font=font_subtitle)
draw_wrapped_text(draw2, (140, 790), p3, font_body, SLATE_DARK, 1640, 7)

slides.append(img2)

# --- SLIDE 3: Vision & Mission ---
img3 = Image.new("RGB", (W, H), LIGHT_BG)
draw3 = ImageDraw.Draw(img3)
draw_header(draw3, img3, "Vision & Mission")

draw3.text((100, 140), "Our Direction & Strategic Intent", fill=NAVY, font=font_title)

# Vision Card
draw3.rectangle([100, 240, (W // 2) - 30, 850], fill=CRIMSON)
draw3.text((150, 300), "VISION", fill=WHITE, font=font_hero)
draw3.line([150, 390, 350, 390], fill=WHITE, width=4)
v_text = ("To contribute towards a slum-free Mumbai by enabling inclusive, sustainable, and well-executed "
          "urban redevelopment.")
draw3.text((150, 450), "Slum-Free Mumbai Goal", fill=WHITE, font=font_subtitle)
draw_wrapped_text(draw3, (150, 520), v_text, font_body_bold, WHITE, 700, 12)

# Mission Card
draw3.rectangle([(W // 2) + 30, 240, W - 100, 850], fill=NAVY)
draw3.text([(W // 2) + 80, 300], "MISSION", fill=WHITE, font=font_hero)
draw3.line([(W // 2) + 80, 390, (W // 2) + 280, 390], fill=WHITE, width=4)
m_text = ("To transform complex redevelopment challenges into executable solutions through strategic advisory and "
          "disciplined project execution.")
draw3.text([(W // 2) + 80, 450], "Executable Advisory Solutions", fill=WHITE, font=font_subtitle)
draw_wrapped_text(draw3, ((W // 2) + 80, 520), m_text, font_body_bold, WHITE, 700, 12)

slides.append(img3)

# --- SLIDE 4: Leadership Team ---
img4 = Image.new("RGB", (W, H), LIGHT_BG)
draw4 = ImageDraw.Draw(img4)
draw_header(draw4, img4, "Leadership Team")

draw4.text((100, 140), "Our Leadership Team", fill=NAVY, font=font_title)

leaders = [
    {
        "name": "Dr. Manoj Harlikar",
        "role": "CEO",
        "bio": "Postgraduate veterinary professional with a PGDBM and over 26 years of diversified industry experience across pharmaceuticals, insurance, banking, real estate and large-scale ground operations.",
        "img": "aquiretested/images/manoj-harlikar.jpg",
        "x": 100
    },
    {
        "name": "Srinivasan Mohan",
        "role": "COO",
        "bio": "A seasoned professional with nearly 30 years of experience across Banking, Financial Services, Real Estate, and SRA Redevelopment Projects.",
        "img": "aquiretested/images/srinivasan-mohan.jpg",
        "x": 680
    },
    {
        "name": "Mayilvanan Pandi",
        "role": "HOD - Annexure",
        "bio": "Professional with over 29 years of diverse industry experience spanning Banking, Aviation (Airlines), and Real Estate sectors.",
        "img": "aquiretested/images/mayilvanan-pandi.jpg",
        "x": 1260
    }
]

for l in leaders:
    x = l["x"]
    draw4.rectangle([x, 240, x + 540, 880], fill=WHITE, outline=SLATE_BORDER, width=2)
    draw4.rectangle([x, 240, x + 540, 250], fill=CRIMSON)
    
    # Leader avatar photo
    avatar = load_and_cover(l["img"], 220, 220)
    if avatar:
        img4.paste(avatar, (x + 160, 280))
        draw4.rectangle([x + 160, 280, x + 380, 500], outline=CRIMSON, width=3)
    
    draw4.text((x + 40, 520), l["name"], fill=NAVY, font=font_subtitle)
    draw4.text((x + 40, 565), l["role"], fill=CRIMSON, font=font_body_bold)
    
    # Wrap bio
    words = l["bio"].split()
    lines_bio = []
    curr = ""
    for w in words:
        if len(curr + " " + w) > 42:
            lines_bio.append(curr)
            curr = w
        else:
            curr = (curr + " " + w).strip()
    if curr:
        lines_bio.append(curr)
        
    by = 610
    for lb in lines_bio:
        draw4.text((x + 40, by), lb, fill=SLATE_DARK, font=font_body)
        by += 32

slides.append(img4)

# Helper function to generate 10-module grid slides
def create_service_slide(title_text, intro_text, items, icon_code="⚡"):
    img = Image.new("RGB", (W, H), LIGHT_BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, img, title_text)
    
    draw.text((100, 125), title_text, fill=NAVY, font=font_title)
    
    # Wrap intro text
    words = intro_text.split()
    i_lines = []
    c = ""
    for w in words:
        if len(c + " " + w) > 135:
            i_lines.append(c)
            c = w
        else:
            c = (c + " " + w).strip()
    if c:
        i_lines.append(c)
        
    iy = 185
    for il in i_lines:
        draw.text((100, iy), il, fill=SLATE_DARK, font=font_small)
        iy += 24
        
    # Render 10 Cards Grid (2 rows x 5 columns)
    start_y = 260
    card_w = 320
    card_h = 270
    gap_x = 25
    gap_y = 25
    
    for idx, item in enumerate(items):
        r = idx // 5
        col = idx % 5
        cx = 100 + col * (card_w + gap_x)
        cy = start_y + r * (card_h + gap_y)
        
        draw.rectangle([cx, cy, cx + card_w, cy + card_h], fill=WHITE, outline=SLATE_BORDER, width=2)
        draw.rectangle([cx, cy, cx + card_w, cy + 8], fill=CRIMSON if r == 0 else NAVY)
        
        # Module badge number
        draw.rectangle([cx + 20, cy + 25, cx + 70, cy + 55], fill=LIGHT_BG)
        draw.text((cx + 32, cy + 30), f"{idx+1:02d}", fill=CRIMSON, font=font_badge)
        
        # Wrap item text
        words_item = item.split()
        item_lines = []
        c_item = ""
        for w in words_item:
            if len(c_item + " " + w) > 22:
                item_lines.append(c_item)
                c_item = w
            else:
                c_item = (c_item + " " + w).strip()
        if c_item:
            item_lines.append(c_item)
            
        ty = cy + 75
        for tl in item_lines:
            draw.text((cx + 20, ty), tl, fill=NAVY, font=font_body_bold)
            ty += 28

    return img

# --- SLIDE 5: Tenant Management ---
tenant_items = [
    "Identify Local Facilitators & Supporters",
    "Conduct Society Meetings on Ground",
    "Survey (Lane Reccee, Numbering, Lidar & Base Map)",
    "Documentation, Eligibility & Application Support",
    "Data Analysis & Report Generations",
    "Nuisance Control / Special-Case Support",
    "Individual Agreements Coordination",
    "Rent Readiness / Bank / KYC Support",
    "Shifting Readiness and Evacuation",
    "Demolition & Fencing Oversight"
]
slides.append(create_service_slide(
    "What We Can Offer in Tenant Management",
    "A&M Advisory Pvt. Ltd plays a pivotal role in ensuring the smooth planning, coordination, and execution of SRA projects. We manage end-to-end processes with a focus on compliance, transparency, and efficiency.",
    tenant_items
))

# --- SLIDE 6: Liaisoning ---
liaison_items = [
    "Coordinate with SRA & Municipal Authorities",
    "Manage Submission of Proposals & Follow-ups",
    "Obtain Necessary NOCs, LOI & IOA Approvals",
    "Ensure Compliance with Rules & Policies",
    "Facilitate Communication with Stakeholders",
    "Resolve Regulatory Challenges & Expedite",
    "Liaisoning Stakeholder on Ground",
    "Institutional & Key Stakeholder Management",
    "Legal Regulatory & Compliance Documentation",
    "Senior Advisors & Specialist Retainers"
]
slides.append(create_service_slide(
    "What We Can Offer in Liaisoning",
    "A&M Advisory Pvt. Ltd ensures seamless coordination and communication with all relevant government authorities involved in SRA projects. We act as a bridge between developers, societies, and regulatory bodies.",
    liaison_items
))

# --- SLIDE 7: IEC ---
iec_items = [
    "Zone Launch & Mobilisation Events",
    "Monthly Community Town Halls",
    "Lane / Chawl / Society Micro-Meetings",
    "Policy / Legal / Technical Briefing Support",
    "Printed IEC Materials & Outreach",
    "Digital / WhatsApp / SMS / IVR Channels",
    "Audio-Visual & Explainer Content",
    "Grievance Redressal Camps",
    "Media Monitoring & Misinformation Response",
    "Targeted Community Awareness Campaigns"
]
slides.append(create_service_slide(
    "What We Can Offer in IEC",
    "A&M Advisory Pvt. Ltd drives impactful Information, Education, and Communication (IEC) initiatives to foster trust and clarity among all stakeholders in SRA projects.",
    iec_items
))

# --- SLIDE 8: Facility Management ---
facility_items = [
    "Facility Operations Coordination",
    "Maintenance & Repair Support",
    "Vendor & Manpower Management",
    "Safety & Compliance Monitoring",
    "Asset & Equipment Management",
    "Preventive & Predictive Maintenance",
    "Housekeeping & Janitorial Management",
    "24/7 Security Services",
    "Utility & Energy Management",
    "Space Planning & Workplace Management"
]
slides.append(create_service_slide(
    "What We Can Offer in Facility Management",
    "A&M Advisory Pvt. Ltd provides comprehensive and reliable facility management solutions to uphold the quality and safety of developments within SRA projects.",
    facility_items
))

# --- SLIDE 9: GBR, POA, DA & CC ---
img9 = Image.new("RGB", (W, H), LIGHT_BG)
draw9 = ImageDraw.Draw(img9)
draw_header(draw9, img9, "Legal & Statutory Coordination")

draw9.text((100, 130), "GBR, POA, DA and CC Support", fill=NAVY, font=font_title)
draw9.text((100, 190), "Structured coordination for key society resolutions, redevelopment instruments and commencement-stage approvals.", fill=SLATE_DARK, font=font_body)

pillars = [
    ("GBR · General Body Resolution", "Resolution records, meeting coordination and supporting-document readiness.", "Meeting-record, resolution and stakeholder-coordination support for formally documented society decisions."),
    ("POA · Power of Attorney", "Execution coordination with authorised signatories & legal teams.", "Execution-readiness, document collection and coordination with appointed legal professionals and authorised signatories."),
    ("DA · Development Agreement", "Stakeholder & document coordination for redevelopment agreement.", "Stakeholder, schedule and supporting-document coordination for the redevelopment agreement review and execution process."),
    ("CC · Commencement Certificate", "Compliance tracking & liaisoning support for commencement.", "Submission tracking, compliance coordination and authority follow-ups for commencement-stage approval.")
]

for idx, (p_title, p_sub, p_desc) in enumerate(pillars):
    r = idx // 2
    col = idx % 2
    x = 100 + col * 870
    y = 260 + r * 300
    
    draw9.rectangle([x, y, x + 840, y + 260], fill=WHITE, outline=SLATE_BORDER, width=2)
    draw9.rectangle([x, y, x + 12, y + 260], fill=CRIMSON if idx % 2 == 0 else NAVY)
    
    draw9.text((x + 40, y + 30), p_title, fill=NAVY, font=font_subtitle)
    draw9.text((x + 40, y + 80), p_sub, fill=CRIMSON, font=font_body_bold)
    
    # Wrap desc
    w_desc = p_desc.split()
    d_lines = []
    cd = ""
    for w in w_desc:
        if len(cd + " " + w) > 60:
            d_lines.append(cd)
            cd = w
        else:
            cd = (cd + " " + w).strip()
    if cd:
        d_lines.append(cd)
        
    dy = y + 130
    for dl in d_lines:
        draw9.text((x + 40, dy), dl, fill=SLATE_DARK, font=font_body)
        dy += 32

slides.append(img9)

# --- SLIDE 10: Our Goals ---
img10 = Image.new("RGB", (W, H), LIGHT_BG)
draw10 = ImageDraw.Draw(img10)
draw_header(draw10, img10, "Our Goals")

draw10.text((100, 130), "Our Core Strategic Goals", fill=NAVY, font=font_title)
draw10.text((100, 190), "We aim to ensure timely project delivery, uphold highest standards of compliance & transparency, and create long-term value.", fill=SLATE_DARK, font=font_body)

goals = [
    ("01", "Operational Excellence", "Ensure seamless execution of SRA projects through structured processes, accurate documentation, and strict adherence to timelines, delivering efficiency and consistency at every stage."),
    ("02", "Regulatory Compliance & Coordination", "Maintain strong liaisoning with authorities to secure timely approvals, ensure full compliance with SRA regulations, and enable smooth coordination between all stakeholders."),
    ("03", "Sustainable Urban Impact", "Contribute to organized urban redevelopment by delivering high-quality rehabilitation solutions, improving community living standards, and creating long-term value for clients and society.")
]

for idx, (num, g_title, g_desc) in enumerate(goals):
    gx = 100 + idx * 580
    draw10.rectangle([gx, 260, gx + 540, 880], fill=WHITE, outline=SLATE_BORDER, width=2)
    draw10.rectangle([gx, 260, gx + 540, 360], fill=NAVY if idx % 2 == 0 else CRIMSON)
    
    draw10.text((gx + 40, 285), num, fill=WHITE, font=font_hero)
    title_bottom = draw_wrapped_text(draw10, (gx + 40, 390), g_title, font_card_title, NAVY, 460, 5)
    draw_wrapped_text(draw10, (gx + 40, max(475, title_bottom + 18)), g_desc, font_body, SLATE_DARK, 460, 10)

slides.append(img10)

# --- SLIDE 11: Closing Note ---
img11 = Image.new("RGB", (W, H), LIGHT_BG)
draw11 = ImageDraw.Draw(img11)
draw_header(draw11, img11, "Closing Note")

draw11.text((100, 140), "Closing Note", fill=NAVY, font=font_title)

draw11.rectangle([100, 240, W - 100, 850], fill=WHITE, outline=SLATE_BORDER, width=2)
draw11.rectangle([100, 240, 120, 850], fill=CRIMSON)

cn1 = ("A&M Advisory Pvt. Ltd Stands as a Reliable Partner in Delivering Successful SRA Projects Through Structured "
       "Planning, Regulatory Expertise, and Efficient Execution. Our Commitment to Transparency, Compliance, and "
       "Stakeholder Coordination Ensures Smooth Project Delivery at every stage.")
draw11.text((160, 300), "A Reliable Partner for SRA Redevelopment", fill=CRIMSON, font=font_subtitle)
draw_wrapped_text(draw11, (160, 360), cn1, font_body, SLATE_DARK, 1580, 10)

cn2 = ("With a Focus on Quality, Accountability, and Timely Completion, we Contribute to Sustainable Urban Redevelopment "
       "and Improved Living Standards. Guided by Advisory Excellence, we Remain Dedicated to Building The Future Together.")
draw11.text((160, 540), "Guided by Advisory Excellence", fill=NAVY, font=font_subtitle)
draw_wrapped_text(draw11, (160, 600), cn2, font_body, SLATE_DARK, 1580, 10)

slides.append(img11)

# --- SLIDE 12: Thank You & Contact Us ---
img12 = Image.new("RGB", (W, H), NAVY)
draw12 = ImageDraw.Draw(img12)

logo12 = load_and_contain('aquiretested/images/a&mwhitelogo.png', 350, 120)
if logo12:
    img12.paste(logo12, (120, 120), logo12)
else:
    draw12.text((120, 120), "A&M ADVISORY", fill=WHITE, font=font_hero)

draw12.text((120, 280), "Thank You!", fill=WHITE, font=font_hero)
draw12.text((120, 370), "Contact Us", fill=CRIMSON, font=font_hero)

draw12.line([120, 470, 600, 470], fill=WHITE, width=3)

contact_rows = [
    ("Phone", "+91 022-45648350"),
    ("Email", "info@aquireandmanage.com / aquireandmanage@gmail.com"),
    ("Website", "www.aquireandmanage.com"),
    ("Corporate Office", "102B, Hallmark Business Plaza, Jagat Vidya Marg, Bandra East, Mumbai, Maharashtra 400051"),
]
row_y = 520
for label, value in contact_rows:
    draw12.text((120, row_y), f"{label}:", fill=WHITE, font=font_body_bold)
    row_y = max(
        row_y + 62,
        draw_wrapped_text(draw12, (400, row_y), value, font_contact, LIGHT_BG, 1380, 8) + 22,
    )

slides.append(img12)

# Ensure output assets dir exists
os.makedirs('aquiretested/assets', exist_ok=True)
pdf_path = 'aquiretested/assets/AM_Advisory_Company_Profile.pdf'

# Save all 12 slides as high-quality PDF
slides[0].save(pdf_path, save_all=True, append_images=slides[1:], format="PDF", resolution=150.0)

print(f"Successfully generated official 12-page company profile PDF at {pdf_path}")
