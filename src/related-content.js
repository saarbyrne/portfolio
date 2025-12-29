// Related content configuration
// This manages which articles/case studies appear as suggestions on each page

export const relatedContent = {
  // Articles
  'projects/intelligram.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/ai-maths-helper.html',
        category: 'Project',
        title: 'AI Maths Helper',
        description: 'A friend of mine teaches maths for the Leaving Cert in Ireland. We were chatting about how students often revise on their own, stuck on a topic.',
        image: '/src/assets/2024/08/Frame-1@2x.png'
      },
      {
        type: 'article',
        url: '/projects/slug-translate.html',
        category: 'Project',
        title: 'Slug Translate Chrome Extension',
        description: 'Late one Friday I was hopping between English and Spanish tabs, copy and pasting to Google Translate, which is cumbersome and felt tedious.',
        image: '/src/assets/blog/slug-translate-1.png'
      }
    ]
  },
  'projects/design-democracy.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-philosophy.html',
        category: 'Essay',
        title: 'My design philosophy [WIP]',
        description: 'The aim of this document is to capture my thoughts on design.',
        image: '/src/assets/2024/08/Frame-5@2x.png'
      },
      {
        type: 'article',
        url: '/projects/business-vessel.html',
        category: 'Essay',
        title: 'Business As a Vessel',
        description: 'The aim of this is piece is for me to describe my thinking on business as an entity in the world.',
        image: '/src/assets/2024/08/Frame-4@2x.png'
      }
    ]
  },
  'projects/ai-maths-helper.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/intelligram.html',
        category: 'Project',
        title: 'Intelligram for Instagram',
        description: 'An iOS app leveraging machine learning to analyze Instagram photos and predict engagement based on image quality patterns.',
        image: '/src/assets/2024/02/icon.png'
      },
      {
        type: 'article',
        url: '/projects/slug-translate.html',
        category: 'Project',
        title: 'Slug Translate Chrome Extension',
        description: 'Late one Friday I was hopping between English and Spanish tabs, copy and pasting to Google Translate.',
        image: '/src/assets/blog/slug-translate-1.png'
      }
    ]
  },
  'projects/slug-translate.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/ai-maths-helper.html',
        category: 'Project',
        title: 'AI Maths Helper',
        description: 'A friend of mine teaches maths for the Leaving Cert in Ireland. We were chatting about how students often revise on their own.',
        image: '/src/assets/2024/08/Frame-1@2x.png'
      },
      {
        type: 'article',
        url: '/projects/intelligram.html',
        category: 'Project',
        title: 'Intelligram for Instagram',
        description: 'An iOS app leveraging machine learning to analyze Instagram photos and predict engagement.',
        image: '/src/assets/2024/02/icon.png'
      }
    ]
  },
  'projects/design-resources.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-strategy.html',
        category: 'Strategy',
        title: 'Design Strategy',
        description: 'This is the design strategy I use for Kitman Labs after we downsized the team based on a need for the company to mature.',
        image: '/src/assets/2024/08/Frame-2@2x.png'
      },
      {
        type: 'article',
        url: '/projects/leading-design-team.html',
        category: 'Essay',
        title: 'Leading a Design Team',
        description: "My journey as a designer has been shaped by a variety of experiences, from working with top sports teams to developing healthcare products.",
        image: '/src/assets/2024/08/DALL·E-2024-08-11-08.00.56-Create-a-minimalistic-abstract-image-in-the-Bauhaus-style-with-the-theme-of-social-environment.-Use-a-simple-palette-of-primary-colors-red-blue-yel.webp'
      }
    ]
  },
  'projects/design-strategy.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-moats.html',
        category: 'Strategy',
        title: 'Design Moats',
        description: 'Design moats are things that reinforce the design teams position and competitive advantage.',
        image: '/src/assets/2024/08/Frame-3@2x.png'
      },
      {
        type: 'article',
        url: '/projects/value-of-design.html',
        category: 'Essay',
        title: 'Value of Design',
        description: 'Design needs to advocate. I make the assumption, based on experience, that people still dont understand product / UX design.',
        image: '/src/assets/blog/value-of-design-1.png'
      }
    ]
  },
  'projects/design-moats.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-strategy.html',
        category: 'Strategy',
        title: 'Design Strategy',
        description: 'This is the design strategy I use for Kitman Labs after we downsized the team.',
        image: '/src/assets/2024/08/Frame-2@2x.png'
      },
      {
        type: 'article',
        url: '/projects/leading-design-team.html',
        category: 'Essay',
        title: 'Leading a Design Team',
        description: "My journey as a designer has been shaped by a variety of experiences.",
        image: '/src/assets/2024/08/DALL·E-2024-08-11-08.00.56-Create-a-minimalistic-abstract-image-in-the-Bauhaus-style-with-the-theme-of-social-environment.-Use-a-simple-palette-of-primary-colors-red-blue-yel.webp'
      }
    ]
  },
  'projects/business-vessel.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-philosophy.html',
        category: 'Essay',
        title: 'My design philosophy [WIP]',
        description: 'The aim of this document is to capture my thoughts on design.',
        image: '/src/assets/2024/08/Frame-5@2x.png'
      },
      {
        type: 'article',
        url: '/projects/value-of-design.html',
        category: 'Essay',
        title: 'Value of Design',
        description: 'Design needs to advocate. I make the assumption that people still dont understand product / UX design.',
        image: '/src/assets/blog/value-of-design-1.png'
      }
    ]
  },
  'projects/design-philosophy.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-democracy.html',
        category: 'Essay',
        title: 'Design of Democracy',
        description: 'As part of the Critical Design Philosophies course I recently did at the end of 2024, I spent some time looking at Democracy.',
        image: '/src/assets/blog/design-democracy-1.png'
      },
      {
        type: 'article',
        url: '/projects/value-of-design.html',
        category: 'Essay',
        title: 'Value of Design',
        description: 'Design needs to advocate. I make the assumption that people still dont understand product / UX design.',
        image: '/src/assets/blog/value-of-design-1.png'
      }
    ]
  },
  'projects/value-of-design.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-philosophy.html',
        category: 'Essay',
        title: 'My design philosophy [WIP]',
        description: 'The aim of this document is to capture my thoughts on design.',
        image: '/src/assets/2024/08/Frame-5@2x.png'
      },
      {
        type: 'article',
        url: '/projects/leading-design-team.html',
        category: 'Essay',
        title: 'Leading a Design Team',
        description: "My journey as a designer has been shaped by a variety of experiences.",
        image: '/src/assets/2024/08/DALL·E-2024-08-11-08.00.56-Create-a-minimalistic-abstract-image-in-the-Bauhaus-style-with-the-theme-of-social-environment.-Use-a-simple-palette-of-primary-colors-red-blue-yel.webp'
      }
    ]
  },
  'projects/leading-design-team.html': {
    suggestions: [
      {
        type: 'article',
        url: '/projects/design-strategy.html',
        category: 'Strategy',
        title: 'Design Strategy',
        description: 'This is the design strategy I use for Kitman Labs after we downsized the team.',
        image: '/src/assets/2024/08/Frame-2@2x.png'
      },
      {
        type: 'article',
        url: '/projects/design-resources.html',
        category: 'Resources',
        title: 'Design Manger Resources',
        description: 'This is a mishmash of stuff I have used and actually found useful. Hopefully it helps.',
        image: '/src/assets/blog/design-resources-1.png'
      }
    ]
  },

  // Case Studies
  'case-studies/rehab.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/player-assessment.html',
        category: 'Kitman Labs',
        title: 'Player Assessments',
        description: 'We used a design thinking approach to develop a feature for backroom staff at sports teams to rate their players.',
        image: '/src/assets/2024/02/Journey_Map-1.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/information-architecture.html',
        category: 'Kitman Labs',
        title: 'Information Architecture',
        description: "Kitman Labs' main product grew with little thought and all departments agreed the information architecture needed updating.",
        image: '/src/assets/2024/02/site_map_ai.png'
      }
    ]
  },
  'case-studies/information-architecture.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/rehab.html',
        category: 'Kitman Labs',
        title: 'Player Rehab',
        description: 'Medical staff in sports need a way to document a programme of exercises and treatments for an injured player.',
        image: '/src/assets/2024/02/Rehab_Journey_Map.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/player-assessment.html',
        category: 'Kitman Labs',
        title: 'Player Assessments',
        description: 'We used a design thinking approach to develop a feature for backroom staff at sports teams to rate their players.',
        image: '/src/assets/2024/02/Journey_Map-1.png'
      }
    ]
  },
  'projects/planning-advisor.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/projects/rehab-agent.html',
        category: 'Personal Project',
        title: 'Agent Based Rehab Plan',
        description: "My Garmin watch collects loads of data, but it's stuck in the Garmin Connect app which doesn't allow me to do anything with it.",
        image: '/src/assets/rehab-agent/Screenshot-2025-12-07-at-13.20.21.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/end-of-season-review.html',
        category: 'Kitman Labs',
        title: 'End Of Season Review',
        description: 'As part of work for the Premier League we were tasked with developing an app for youth elite players at academies.',
        image: '/src/assets/2024/02/000.png'
      }
    ]
  },
  'projects/rehab-agent.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/projects/planning-advisor.html',
        category: 'Kitman Labs',
        title: 'Planning Advisor',
        description: 'For a Hackathon, I wanted to create an end to end flow for performance coaches to create detailed, periodised training plans.',
        image: '/src/assets/planning-advisor/Screenshot-2025-12-07-at-21.02.31-2048x1014.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/rehab.html',
        category: 'Kitman Labs',
        title: 'Player Rehab',
        description: 'Medical staff in sports need a way to document a programme of exercises and treatments for an injured player.',
        image: '/src/assets/2024/02/Rehab_Journey_Map.png'
      }
    ]
  },
  'case-studies/end-of-season-review.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/player-assessment.html',
        category: 'Kitman Labs',
        title: 'Player Assessments',
        description: 'We used a design thinking approach to develop a feature for backroom staff at sports teams to rate their players.',
        image: '/src/assets/2024/02/Journey_Map-1.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/pro-coach-partnership.html',
        category: 'Kitman Labs',
        title: 'Pro Coach Partnership',
        description: 'The Pro Coach Partnership represents a coalition of UK sports organisations working toward a common goal.',
        image: '/src/assets/2025/12/Screenshot-2025-12-06-at-22.15.44-scaled.png'
      }
    ]
  },
  'case-studies/player-assessment.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/rehab.html',
        category: 'Kitman Labs',
        title: 'Player Rehab',
        description: 'Medical staff in sports need a way to document a programme of exercises and treatments for an injured player.',
        image: '/src/assets/2024/02/Rehab_Journey_Map.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/end-of-season-review.html',
        category: 'Kitman Labs',
        title: 'End Of Season Review',
        description: 'As part of work for the Premier League we were tasked with developing an app for youth elite players at academies.',
        image: '/src/assets/2024/02/000.png'
      }
    ]
  },
  'case-studies/pro-coach-partnership.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/information-architecture.html',
        category: 'Kitman Labs',
        title: 'Information Architecture',
        description: "Kitman Labs' main product grew with little thought and all departments agreed the information architecture needed updating.",
        image: '/src/assets/2024/02/site_map_ai.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/player-assessment.html',
        category: 'Kitman Labs',
        title: 'Player Assessments',
        description: 'We used a design thinking approach to develop a feature for backroom staff at sports teams to rate their players.',
        image: '/src/assets/2024/02/Journey_Map-1.png'
      }
    ]
  },
  'case-studies/client-assessment.html': {
    suggestions: [
      {
        type: 'case-study',
        url: '/case-studies/player-assessment.html',
        category: 'Kitman Labs',
        title: 'Player Assessments',
        description: 'We used a design thinking approach to develop a feature for backroom staff at sports teams to rate their players.',
        image: '/src/assets/2024/02/Journey_Map-1.png'
      },
      {
        type: 'case-study',
        url: '/case-studies/rehab.html',
        category: 'Kitman Labs',
        title: 'Player Rehab',
        description: 'Medical staff in sports need a way to document a programme of exercises and treatments for an injured player.',
        image: '/src/assets/2024/02/Rehab_Journey_Map.png'
      }
    ]
  }
};

// Function to load related content for current page
export function loadRelatedContent() {
  const currentPath = window.location.pathname.replace(/^\//, '');
  const content = relatedContent[currentPath];

  if (!content || !content.suggestions || content.suggestions.length === 0) {
    return;
  }

  const container = document.getElementById('related-content');
  if (!container) return;

  const html = `
    <div class="bg-white">
      <div class="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <div class="mb-6 text-center">
          <h2 class="text-xl font-bold text-gray-800">Read More</h2>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
          ${content.suggestions.map(item => `
            <a href="${item.url}" class="group flex-shrink-0 w-64 flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div class="h-32 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                <img class="max-w-full max-h-full object-contain rounded-lg" src="${item.image}" alt="${item.title}">
              </div>
              <div class="p-3">
                <span class="block mb-1 text-xs font-semibold uppercase text-blue-600">
                  ${item.category}
                </span>
                <h3 class="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                  ${item.title}
                </h3>
                <p class="text-xs text-gray-600 line-clamp-2">
                  ${item.description}
                </p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Auto-load on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', loadRelatedContent);
}
