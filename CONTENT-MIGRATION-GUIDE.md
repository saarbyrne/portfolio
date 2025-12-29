# WordPress Content Migration Guide

## Summary

Your WordPress export has been successfully parsed into structured JSON files in the `/data/` directory.

### Content Overview

- **14 Blog Posts** → Migrate to `/writing/` directory
- **7 Pages** → 6 are case studies, 1 is about page
- **4 Categories:** Experiment, Idea, Management, Opinion
- **6 Tags:** Communication, Design Management, Design Teams, Leading Teams, Resource, User Research
- **180 Media Files** → Download and organize in `/src/assets/`

---

## 📊 Content Breakdown

### Case Studies (6 pages)

These WordPress PAGES should become case studies in `/case-studies/`:

1. **Player Assessment**
   - Slug: `case-study`
   - Should be: `player-assessment.html`
   - Role: Product Designer @ Kitman Labs
   - Description: Basic design thinking approach to design a feature for backroom staff at sports teams to rate their players

2. **Rehab**
   - Slug: `rehab`
   - File: `rehab.html` ✅ (already exists!)
   - Role: Product Designer @ Kitman Labs
   - Description: Medical staff in sports need a way to document a programme of exercises and treatments for injured players

3. **Information Architecture**
   - Slug: `information-architecture`
   - Should be: `information-architecture.html`
   - Role: Product Designer @ Kitman Labs
   - Description: Information architecture changes when you don't stay on top of them

4. **Client Assessment**
   - Slug: `client-assessment`
   - Should be: `client-assessment.html`
   - Role: Product Designer @ IBM Watson Health
   - Description: 6 week Design Camp project in Austin - research, design and prototype an app for care managers

5. **End Of Season Review**
   - Slug: `end-of-season-review`
   - Should be: `end-of-season-review.html`
   - Role: Product Designer @ Kitman Labs
   - Description: App for youth elite players at academies as part of work for the Premier League

6. **About**
   - Slug: `about-me`
   - File: `about.html` ✅ (already exists!)
   - This is your about page (not a case study)

---

### Blog Posts (14 articles)

These WordPress POSTS should become articles in `/writing/`:

#### Management & Leadership (7 posts)

1. **Leading a Design Team** (`leading-a-design-team-in-the-software-industry.html`)
   - Published: 2024-08-10
   - Tags: Design Management, Design Teams, Leading Teams

2. **Value of Design** (`value-of-design.html`)
   - Published: 2024-08-10
   - Tags: Design Management, Design Teams, Leading Teams

3. **Design Moats** (`design-moats.html`)
   - Published: 2024-08-24
   - Tags: Design Management, Leading Teams

4. **Design Strategy** (`design-strategy.html`)
   - Published: 2024-08-30
   - Tags: Design Management, Design Teams

5. **Design Manager Resources** (`design-manger-resources.html`)
   - Published: 2024-08-31
   - Tags: Design Management, Design Teams, Leading Teams

#### Opinion Pieces (4 posts)

6. **My design philosophy [WIP]** (`my-design-philosophy-wip-forever.html`)
   - Published: 2024-08-10

7. **Business As a Vessel** (`the-business-as-a-vessel.html`)
   - Published: 2024-08-13

8. **Design of Democracy** (`design-of-democracy.html`)
   - Published: 2025-08-03
   - Categories: Idea, Opinion

#### Experiments & Side Projects (7 posts)

9. **Slug Translate: My Weekend Hack** (`slug-translate-weekend-hack.html`)
   - Published: 2025-04-20
   - Description: Chrome Extension from pain point to solution

10. **AI Maths Helper** (`ai-maths-helper.html`)
    - Published: 2025-04-20

11. **Agent Based Rehab Plan** (`agent-based-rehab-plan.html`)
    - Published: 2025-12-06
    - Categories: Experiment, Idea, Opinion

12. **Pro Coach Partnership** (`pcp-dashboard-prototype-when-imagination-meets-interaction.html`)
    - Published: 2025-12-06
    - Categories: Experiment, Idea

13. **Intelligram for Instagram** (`intelligram-ai-powered-photo-selection-for-instagram.html`)
    - Published: 2025-12-07
    - Categories: Experiment, Opinion

14. **Planning Advisor: AI-Powered Training Periodisation** (`planning-advisor-ai-powered-training-periodisation.html`)
    - Published: 2025-12-07
    - Category: Experiment

---

## 🎯 Recommended Actions

### 1. Case Studies

**Already Complete:**
- ✅ Rehab case study exists at `/case-studies/rehab.html`
- ✅ About page exists at `/about.html`

**Need to Create (5 files):**
- [ ] `/case-studies/player-assessment.html`
- [ ] `/case-studies/information-architecture.html`
- [ ] `/case-studies/client-assessment.html`
- [ ] `/case-studies/end-of-season-review.html`

**Template to use:** `/case-studies/template.html`
**Example to follow:** `/case-studies/rehab.html`

### 2. Blog Articles

**Need to Create (14 files):**
All files go in `/writing/` directory

**Template to use:** `/writing/template.html`

### 3. Additional Pages Needed

- [ ] `/writing/index.html` - Blog listing page showing all 14 articles
- [ ] Consider creating category filter pages for Management, Opinion, Experiments

### 4. Navigation Updates

Update the dropdown menu in all HTML files (header section, lines ~62-75):

**Current case studies in dropdown:**
- Rehab ✅
- Information Architecture (needs creation)
- Planning Advisor (this is a BLOG POST, not a case study!)
- Agent Based Rehab Plan (this is a BLOG POST, not a case study!)

**Should be:**
- Rehab
- Player Assessment
- Information Architecture
- Client Assessment
- End Of Season Review

### 5. Homepage Updates

The homepage currently shows 10 project cards. Based on your WordPress content:

**Case Studies to Feature (5):**
1. Rehab ✅ (already done)
2. Player Assessment (create)
3. Information Architecture (create)
4. Client Assessment (create)
5. End Of Season Review (create)

**Experiment Posts That Could Be Featured (5):**
1. Planning Advisor
2. Agent Based Rehab Plan
3. Pro Coach Partnership (PCP Dashboard)
4. Intelligram
5. Design of Democracy

---

## 📁 File Locations

### Generated Data Files (for reference)
```
/data/
  ├── site-info.json       # Site metadata
  ├── categories.json      # 4 categories
  ├── tags.json            # 6 tags
  ├── posts.json           # 14 blog posts (FULL CONTENT)
  ├── pages.json           # 7 pages (FULL CONTENT)
  ├── media.json           # 180 media files with URLs
  └── portfolio-data.json  # Complete combined dataset
```

### Where Content Should Go
```
/case-studies/
  ├── player-assessment.html       (new)
  ├── information-architecture.html (new)
  ├── client-assessment.html       (new)
  ├── end-of-season-review.html    (new)
  └── rehab.html                   (exists)

/writing/
  ├── index.html                   (new - blog listing)
  ├── leading-a-design-team-in-the-software-industry.html (new)
  ├── value-of-design.html         (new)
  ├── design-moats.html            (new)
  ├── design-strategy.html         (new)
  ├── design-manger-resources.html (new)
  ├── my-design-philosophy-wip-forever.html (new)
  ├── the-business-as-a-vessel.html (new)
  ├── design-of-democracy.html     (new)
  ├── slug-translate-weekend-hack.html (new)
  ├── ai-maths-helper.html         (new)
  ├── agent-based-rehab-plan.html  (new)
  ├── pcp-dashboard-prototype-when-imagination-meets-interaction.html (new)
  ├── intelligram-ai-powered-photo-selection-for-instagram.html (new)
  └── planning-advisor-ai-powered-training-periodisation.html (new)
```

---

## 🖼️ Media Files

You have **180 media files** in your WordPress export. They are organized by folder in the WordPress media library.

**Key folders identified:**
- About Me
- Player Rehab
- Design Management
- Various project folders

**Next steps for media:**
1. Download images from WordPress media URLs (found in `/data/media.json`)
2. Save to `/src/assets/` with descriptive names
3. Update image references when creating HTML files

---

## ⚡ Quick Start Options

### Option A: I generate HTML files for you
I can create all the HTML files automatically using your templates and the parsed WordPress content.

**Pros:** Fast, complete migration
**Cons:** Less control, need to review/edit generated files

### Option B: You create HTML files manually
Use the JSON data in `/data/` folder to manually copy content into your templates.

**Pros:** Full control, can customize as you go
**Cons:** More time-consuming

### Option C: Hybrid approach
I generate the files, you review and edit them before publishing.

**Pros:** Best of both worlds
**Cons:** Still requires review time

---

## 📝 Next Steps

Let me know which approach you prefer, and I can:

1. **Generate HTML files** from templates (Option A/C)
2. **Create a blog listing page** at `/writing/index.html`
3. **Update navigation** across all pages
4. **Update homepage** featured projects grid
5. **Download and organize media files**

All your content is ready in structured JSON format. We just need to decide how you want to integrate it into your Preline site!
