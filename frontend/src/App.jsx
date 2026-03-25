import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8000/api';
const QUESTION_TIME = 20;
const navItems = ['Home', 'Quiz', 'About Authorizer'];

const languageOptions = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'km', label: 'Khmer', flag: '🇰🇭' },
];

const translations = {
  en: {
    brandName: 'Rom Chamraeun',
    brandTagline: 'Quiz Arena • Official Quiz Website',
    langLabel: 'Language',
    headerClientTagline: 'Personal Website + Official Quiz Game',
    headerAdminTagline: 'Admin Quiz Management',
    menu: 'Menu',
    nav: {
      Home: 'Home',
      Quiz: 'Quiz',
      'About Authorizer': 'About Authorizer',
    },
    heroSection: 'Hero Section',
    heroTitleEducation: 'Quiz Game For Education😐',
    heroCopy:
      'Welcome to my official quiz game portfolio. Explore the website and challenge your full-stack knowledge in the Quiz menu.',
    startQuizNow: 'Start Quiz Now',
    banner1TextDefault: 'Start your challenge now',
    banner2TextDefault: 'Practice and improve every day',
    valueCard1TitleDefault: 'Timed Quiz',
    valueCard1TextDefault: 'Fast-paced questions with countdown timer and instant feedback.',
    valueCard2TitleDefault: 'Topic-Based',
    valueCard2TextDefault: 'Choose your favorite topic card and play right away.',
    valueCard3TitleDefault: 'Smart Score',
    valueCard3TextDefault: 'Track points, streak, and accuracy in a modern challenge flow.',
    homePageBadge: 'Home Page • Quiz Landing',
    quizPageBadge: 'Quiz Page • Challenge Mode',
    aboutPageBadge: 'About Page • Authorizer',
    preparedTopics: 'Prepared Topics',
    preparedTopicsDesc: 'Choose a topic and start practicing instantly.',
    noTopics: 'No topics are configured yet. Add questions first.',
    noQuizQuestions: 'No quiz questions are available right now.',
    quizWelcome: 'Welcome to your challenge',
    quizWelcomeDesc: 'One question at a time, instant feedback, and a final score summary.',
    clickTopicStart: 'Click any topic card below to start instantly.',
    searchQuiz: 'Search Quiz',
    searchQuizPlaceholder: 'Search topic, question, or category',
    searchButton: 'Search',
    noSearchResults: 'No topics or questions match your search.',
    allTopics: 'All topics',
    noTopicQuestions: 'No questions found for selected topic.',
    general: 'General',
    back: 'Back',
    aboutTitle: 'About Authorizer',
    aboutDesc:
      'Full-stack developer focused on Laravel + React projects. This page introduces the creator and the mission behind this interactive quiz platform.',
    darkMode: 'Dark',
    lightMode: 'Light',
    footerBrand: 'Quiz Platform',
    footerBrandDesc: 'Interactive learning quiz built with Laravel + React.',
    footerContact: 'Contact',
    footerFollow: 'Follow',
    footerEmail: 'Email: rom@example.com',
    footerLocation: 'Location: Phnom Penh, Cambodia',
    footerSocialGithub: 'GitHub',
    footerSocialLinkedIn: 'LinkedIn',
    footerSocialFacebook: 'Facebook',
    footerCopy: 'All rights reserved.',
    requestFailed: 'Request failed.',
    imageUploadFailed: 'Image upload failed.',
    questionLabel: 'Question',
    scoreLabel: 'Score',
    streakLabel: 'Streak',
    timeLabel: 'Time',
    topicLabel: 'Topic',
    seeResults: 'See Results',
    nextQuestion: 'Next Question',
    cancelQuiz: 'Cancel Quiz',
    quizPickOption: 'Pick one option before time runs out.',
    quizTimesUp: "Time's up. The correct option is highlighted.",
    quizCorrectAnswer: 'Correct answer.',
    pointsShort: 'pts',
    quizNotCorrect: 'Not correct. Study the highlighted answer and continue.',
    resultYourResult: 'Your Result',
    resultOf100: 'of 100',
    resultExcellent: 'Excellent',
    resultGreat: 'Great',
    resultGood: 'Good',
    resultKeepGoing: 'Keep Going',
    resultNoteExcellent: 'Top-tier performance. You mastered this round.',
    resultNoteStrong: 'Strong performance. Keep sharpening your edge.',
    resultNotePractice: 'Solid start. Practice one more round to boost your score.',
    resultSummary: 'Summary',
    resultAccuracy: 'Accuracy',
    resultCorrect: 'Correct',
    resultWrong: 'Wrong',
    resultBestStreak: 'Best Streak',
    resultContinue: 'Continue',
    resultPlayAgain: 'Play Again',
    ariaMainMenu: 'Main menu',
    ariaProfilePhoto: 'Profile photo placeholder',
    ariaHeroArtwork: 'Quiz game hero artwork',
    ariaHighlights: 'Quiz website highlights',
    ariaChooseTopic: 'Choose quiz topic',
    ariaFinalScore: 'Final quiz score',
    ariaResultSummary: 'Result summary breakdown',
    ariaAdminSidebar: 'Admin sidebar menu',
    ariaSocialLinks: 'Social links',
    aboutTechnicalStackLabel: 'Technical Stack',
    aboutTechnicalStackValue: 'GitHub, Vercel, Render, Railway, Hugging Face, Neon',
    aboutComputerLabel: 'Computer',
    aboutComputerValue: 'Basic networking, Linux, cloud fundamentals, Ubuntu',
    aboutMicrosoftLabel: 'Microsoft',
    aboutMicrosoftValue: 'Word, Excel, PowerPoint, Power BI, Access',
    aboutDatabaseLabel: 'Database Management',
    aboutDatabaseValue: 'MySQL, PostgreSQL, SQL Server',
    aboutProgrammingLabel: 'Programming Languages',
    aboutProgrammingValue: 'HTML, CSS, JavaScript, PHP, React, Laravel (Medium)',
    aboutSoftSkillsLabel: 'Soft Skills',
    aboutSoftSkillsValue:
      'Hard working, critical thinking, flexible, friendly and kind, and fast learner for new things',
    admin: {
      noQuestionsAvailable: 'No quiz questions are available right now.',
      noQuestionsForTopic: 'No quiz questions are available for that topic yet.',
      quizCancelled: 'Quiz cancelled. You can pick another topic.',
      adminLoginSuccessful: 'Admin login successful.',
      loggedOut: 'Logged out.',
      topicUpdated: 'Topic updated.',
      topicCreated: 'Topic created.',
      topicImageUploaded: 'Topic image uploaded.',
      selectImageFile: 'Please select an image file.',
      imageTooLarge: 'Image is too large. Please choose one under 2MB.',
      localImageSelected: 'Local image selected. Click Save Site Content to apply it.',
      questionImageUploaded: 'Question image uploaded.',
      imageReadFailed: 'Unable to read selected image file.',
      topicDeleted: 'Topic deleted.',
      categoryUpdated: 'Category updated.',
      categoryCreated: 'Category created.',
      categoryDeleted: 'Category deleted.',
      questionUpdated: 'Question updated.',
      questionCreated: 'Question created.',
      questionDeleted: 'Question deleted.',
      siteContentUpdated: 'Site content updated successfully.',
      siteContentReset: 'Site content reset to default values.',
      panelTitle: 'Admin Panel',
      backToWebsite: 'Back to website',
      loginTitle: 'Admin Login',
      email: 'Email',
      password: 'Password',
      loginAsAdmin: 'Login as Admin',
      loggingIn: 'Logging in...',
      loginWithGoogle: 'Login with Google',
      redirectingToGoogle: 'Redirecting to Google...',
      orContinueWith: 'or continue with',
      googleAdminNotAllowed: 'This Google account is not allowed for admin login.',
      showPassword: 'Show',
      hidePassword: 'Hide',
      showPasswordAria: 'Show password',
      hidePasswordAria: 'Hide password',
      overview: 'Overview',
      siteContent: 'Site Content',
      topics: 'Topics',
      categories: 'Categories',
      questions: 'Questions',
      logout: 'Logout',
      managerTitle: 'Admin Quiz Manager',
      promoText: 'Manage your quiz website content, data, and branding in one place.',
      openSiteContent: 'Open Site Content',
      dashboardOverview: 'Dashboard Overview',
      dashboardOverviewDesc:
        'Track your quiz platform activity and quickly jump to management sections.',
      availableQuizThemes: 'Available quiz themes',
      questionGroupingStatus: 'Question grouping status',
      totalChallengePool: 'Total challenge pool',
      contentDataActivity: 'Content & Data Activity',
      trafficSources: 'Traffic Sources',
      trafficLegend: 'Search • Social • Direct',
      siteTask1: 'Site Content: update Home hero, banner, cards and footer information.',
      siteTask2: 'Topics: set topic names and images.',
      siteTask3: 'Categories: organize questions by category.',
      siteTask4: 'Questions: add or edit quiz content and assign topic/category.',
      manageHomeFooter: 'Manage Home + Footer Content',
      mainColor: 'Main Color',
      heroTitle: 'Hero Title',
      heroText: 'Hero Text',
      heroImageUrl: 'Hero Image URL',
      chooseLocalHeroImage: 'Or choose local hero image',
      uploadingHeroImage: 'Uploading hero image...',
      banner1ImageUrl: 'Banner 1 Image URL',
      chooseLocalBanner1Image: 'Or choose local Banner 1 image',
      uploadingBanner1Image: 'Uploading Banner 1 image...',
      banner2ImageUrl: 'Banner 2 Image URL',
      chooseLocalBanner2Image: 'Or choose local Banner 2 image',
      uploadingBanner2Image: 'Uploading Banner 2 image...',
      banner1Text: 'Banner 1 Text',
      banner2Text: 'Banner 2 Text',
      card1Title: 'Card 1 Title',
      card1Text: 'Card 1 Text',
      card2Title: 'Card 2 Title',
      card2Text: 'Card 2 Text',
      card3Title: 'Card 3 Title',
      card3Text: 'Card 3 Text',
      footerBrand: 'Footer Brand',
      footerDescription: 'Footer Description',
      footerEmail: 'Footer Email',
      footerLocation: 'Footer Location',
      githubUrl: 'GitHub URL',
      linkedInUrl: 'LinkedIn URL',
      facebookUrl: 'Facebook URL',
      footerCopyrightText: 'Footer Copyright Text',
      saveSiteContent: 'Save Site Content',
      resetDefault: 'Reset Default',
      editTopic: 'Edit Topic',
      createTopic: 'Create Topic',
      topicName: 'Topic name',
      topicImageUrl: 'Topic image URL',
      chooseImageFile: 'Or choose image file',
      uploadingImage: 'Uploading image...',
      updateTopic: 'Update Topic',
      addTopic: 'Add Topic',
      cancel: 'Cancel',
      questionsCount: 'questions',
      edit: 'Edit',
      delete: 'Delete',
      editCategory: 'Edit Category',
      createCategory: 'Create Category',
      categoryName: 'Category name',
      description: 'Description',
      updateCategory: 'Update Category',
      addCategory: 'Add Category',
      noDescription: 'No description',
      editQuestion: 'Edit Question',
      createQuestion: 'Create Question',
      questionText: 'Question text',
      topic: 'Topic',
      selectExistingTopic: 'Select existing topic',
      noLinkedTopic: 'No linked topic',
      chooseLocalTopicImage: 'Or choose local topic image',
      uploadingQuestionImage: 'Uploading question image...',
      chooseImageOption: 'Choose image option',
      chooseFromPresetList: 'Choose from preset list',
      clearImage: 'Clear Image',
      noCategory: 'No category',
      optionA: 'Option A',
      optionB: 'Option B',
      optionC: 'Option C',
      optionD: 'Option D',
      correctA: 'Correct: A',
      correctB: 'Correct: B',
      correctC: 'Correct: C',
      correctD: 'Correct: D',
      updateQuestion: 'Update Question',
      addQuestion: 'Add Question',
      general: 'General',
      linkedToTopic: 'Linked to topic',
      topicImageConfigured: 'Topic image configured',
      correctAnswer: 'Correct answer',
    },
  },
  km: {
    brandName: 'Rom Chamraeun',
    brandTagline: 'Quiz Arena • គេហទំព័រសំណួរផ្លូវការ',
    langLabel: 'ភាសា',
    headerClientTagline: 'គេហទំព័រផ្ទាល់ខ្លួន + ហ្គេមសំណួរផ្លូវការ',
    headerAdminTagline: 'គ្រប់គ្រងហ្គេមសំណួរ (Admin)',
    menu: 'ម៉ឺនុយ',
    nav: {
      Home: 'ទំព័រដើម',
      Quiz: 'សំណួរ',
      'About Authorizer': 'អំពីអ្នកនិពន្ធ',
    },
    heroSection: 'ផ្នែកណែនាំ',
    heroTitleEducation: 'ហ្គេមសំណួរសម្រាប់ការអប់រំ😐',
    heroCopy:
      'សូមស្វាគមន៍មកកាន់គេហទំព័រហ្គេមសំណួរផ្លូវការរបស់ខ្ញុំ។ សូមរុករកគេហទំព័រ និងសាកល្បងចំណេះដឹង Full-stack របស់អ្នកនៅផ្នែកសំណួរ។',
    startQuizNow: 'ចាប់ផ្តើមសំណួរឥឡូវនេះ',
    banner1TextDefault: 'ចាប់ផ្តើមការប្រកួតរបស់អ្នកឥឡូវនេះ',
    banner2TextDefault: 'ហាត់ប្រាណ និងអភិវឌ្ឍខ្លួនរាល់ថ្ងៃ',
    valueCard1TitleDefault: 'សំណួរតាមពេលវេលា',
    valueCard1TextDefault: 'សំណួរល្បឿនលឿនជាមួយម៉ោងរាប់ថយក្រោយ និងមតិត្រឡប់ភ្លាមៗ។',
    valueCard2TitleDefault: 'ផ្អែកលើប្រធានបទ',
    valueCard2TextDefault: 'ជ្រើសរើសកាតប្រធានបទដែលអ្នកចូលចិត្ត ហើយលេងភ្លាមៗ។',
    valueCard3TitleDefault: 'ពិន្ទុឆ្លាតវៃ',
    valueCard3TextDefault: 'តាមដានពិន្ទុ ស្ទ្រីក និងភាពត្រឹមត្រូវ ក្នុងទម្រង់ប្រកួតទំនើប។',
    homePageBadge: 'ទំព័រដើម • ទំព័រសំណួរ',
    quizPageBadge: 'ទំព័រសំណួរ • ម៉ូដប្រកួត',
    aboutPageBadge: 'ទំព័រអំពី • អ្នកនិពន្ធ',
    preparedTopics: 'ប្រធានបទដែលបានរៀបចំ',
    preparedTopicsDesc: 'ជ្រើសរើសប្រធានបទ ហើយចាប់ផ្តើមហាត់ភ្លាមៗ។',
    noTopics: 'មិនទាន់មានប្រធានបទទេ។ សូមបន្ថែមសំណួរជាមុនសិន។',
    noQuizQuestions: 'មិនទាន់មានសំណួរសម្រាប់លេងឥឡូវនេះទេ។',
    quizWelcome: 'សូមស្វាគមន៍មកកាន់ការប្រកួតរបស់អ្នក',
    quizWelcomeDesc: 'ម្តងមួយសំណួរ មានមតិត្រឡប់ភ្លាមៗ និងសង្ខេបលទ្ធផលចុងក្រោយ។',
    clickTopicStart: 'ចុចលើកាតប្រធានបទណាមួយដើម្បីចាប់ផ្តើមភ្លាមៗ។',
    searchQuiz: 'ស្វែងរកសំណួរ',
    searchQuizPlaceholder: 'ស្វែងរកប្រធានបទ សំណួរ ឬប្រភេទ',
    searchButton: 'ស្វែងរក',
    noSearchResults: 'មិនមានប្រធានបទ ឬសំណួរត្រូវនឹងការស្វែងរកទេ។',
    allTopics: 'គ្រប់ប្រធានបទ',
    noTopicQuestions: 'មិនមានសំណួរសម្រាប់ប្រធានបទដែលបានជ្រើស។',
    general: 'ទូទៅ',
    back: 'ត្រឡប់ក្រោយ',
    aboutTitle: 'អំពីអ្នកនិពន្ធ',
    aboutDesc:
      'អ្នកអភិវឌ្ឍន៍ Full-stack ផ្តោតលើ Laravel + React។ ទំព័រនេះណែនាំអំពីអ្នកបង្កើត និងបេសកកម្មរបស់វេទិកាហ្គេមសំណួរនេះ។',
    darkMode: 'ងងឹត',
    lightMode: 'ភ្លឺ',
    footerBrand: 'វេទិកាសំណួរ',
    footerBrandDesc: 'វេទិកាសំណួរសម្រាប់រៀន ដោយប្រើ Laravel + React។',
    footerContact: 'ទំនាក់ទំនង',
    footerFollow: 'តាមដាន',
    footerEmail: 'អ៊ីមែល៖ rom@example.com',
    footerLocation: 'ទីតាំង៖ ភ្នំពេញ ប្រទេសកម្ពុជា',
    footerSocialGithub: 'GitHub',
    footerSocialLinkedIn: 'LinkedIn',
    footerSocialFacebook: 'Facebook',
    footerCopy: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
    requestFailed: 'សំណើបានបរាជ័យ។',
    imageUploadFailed: 'ការអាប់ឡូតរូបភាពបានបរាជ័យ។',
    questionLabel: 'សំណួរ',
    scoreLabel: 'ពិន្ទុ',
    streakLabel: 'ស្ទ្រីក',
    timeLabel: 'ពេលវេលា',
    topicLabel: 'ប្រធានបទ',
    seeResults: 'មើលលទ្ធផល',
    nextQuestion: 'សំណួរបន្ទាប់',
    cancelQuiz: 'បោះបង់ការប្រកួត',
    quizPickOption: 'សូមជ្រើសរើសចម្លើយមួយមុនពេលអស់ពេល។',
    quizTimesUp: 'អស់ពេលហើយ។ ចម្លើយត្រឹមត្រូវត្រូវបានបន្លិច។',
    quizCorrectAnswer: 'ចម្លើយត្រឹមត្រូវ។',
    pointsShort: 'ពិន្ទុ',
    quizNotCorrect: 'មិនត្រឹមត្រូវ។ សូមមើលចម្លើយដែលបានបន្លិច ហើយបន្ត។',
    resultYourResult: 'លទ្ធផលរបស់អ្នក',
    resultOf100: 'ក្នុង 100',
    resultExcellent: 'ល្អឥតខ្ចោះ',
    resultGreat: 'ល្អណាស់',
    resultGood: 'ល្អ',
    resultKeepGoing: 'បន្តទៀត',
    resultNoteExcellent: 'លទ្ធផលខ្ពស់បំផុត។ អ្នកបានជោគជ័យយ៉ាងល្អ។',
    resultNoteStrong: 'លទ្ធផលល្អ។ បន្តហាត់ដើម្បីកាន់តែល្អ។',
    resultNotePractice: 'ចាប់ផ្តើមបានល្អ។ លេងម្តងទៀតដើម្បីបង្កើនពិន្ទុ។',
    resultSummary: 'សង្ខេប',
    resultAccuracy: 'ភាពត្រឹមត្រូវ',
    resultCorrect: 'ត្រឹមត្រូវ',
    resultWrong: 'ខុស',
    resultBestStreak: 'ស្ទ្រីកល្អបំផុត',
    resultContinue: 'បន្ត',
    resultPlayAgain: 'លេងម្តងទៀត',
    ariaMainMenu: 'ម៉ឺនុយមេ',
    ariaProfilePhoto: 'កន្លែងរូបភាពប្រវត្តិរូប',
    ariaHeroArtwork: 'រូបភាព Hero ហ្គេមសំណួរ',
    ariaHighlights: 'ចំណុចសំខាន់ៗនៃគេហទំព័រសំណួរ',
    ariaChooseTopic: 'ជ្រើសរើសប្រធានបទសំណួរ',
    ariaFinalScore: 'ពិន្ទុចុងក្រោយ',
    ariaResultSummary: 'សេចក្តីសង្ខេបលទ្ធផល',
    ariaAdminSidebar: 'ម៉ឺនុយជ្រុង Admin',
    ariaSocialLinks: 'តំណបណ្តាញសង្គម',
    aboutTechnicalStackLabel: 'ជំនាញបច្ចេកវិទ្យា',
    aboutTechnicalStackValue: 'GitHub, Vercel, Render, Railway, Hugging Face, Neon',
    aboutComputerLabel: 'កុំព្យូទ័រ',
    aboutComputerValue: 'មូលដ្ឋានបណ្តាញ, Linux, មូលដ្ឋាន Cloud, Ubuntu',
    aboutMicrosoftLabel: 'Microsoft',
    aboutMicrosoftValue: 'Word, Excel, PowerPoint, Power BI, Access',
    aboutDatabaseLabel: 'ការគ្រប់គ្រងមូលដ្ឋានទិន្នន័យ',
    aboutDatabaseValue: 'MySQL, PostgreSQL, SQL Server',
    aboutProgrammingLabel: 'ភាសាកម្មវិធី',
    aboutProgrammingValue: 'HTML, CSS, JavaScript, PHP, React, Laravel (Medium)',
    aboutSoftSkillsLabel: 'ជំនាញទន់',
    aboutSoftSkillsValue: 'ខិតខំធ្វើការ, គិតវិភាគ, បត់បែនបាន, រួសរាយរាក់ទាក់ និងរៀនអ្វីថ្មីបានលឿន',
    admin: {
      noQuestionsAvailable: 'មិនទាន់មានសំណួរសម្រាប់លេងឥឡូវនេះទេ។',
      noQuestionsForTopic: 'មិនទាន់មានសំណួរសម្រាប់ប្រធានបទនេះទេ។',
      quizCancelled: 'បានបោះបង់ការប្រកួត។ អ្នកអាចជ្រើសរើសប្រធានបទផ្សេងទៀត។',
      adminLoginSuccessful: 'ចូលជា Admin បានជោគជ័យ។',
      loggedOut: 'បានចាកចេញ។',
      topicUpdated: 'បានកែប្រែប្រធានបទ។',
      topicCreated: 'បានបង្កើតប្រធានបទ។',
      topicImageUploaded: 'បានអាប់ឡូតរូបប្រធានបទ។',
      selectImageFile: 'សូមជ្រើសរើសឯកសាររូបភាព។',
      imageTooLarge: 'រូបភាពធំពេក។ សូមជ្រើសរើសក្រោម 2MB។',
      localImageSelected: 'បានជ្រើសរើសរូបភាពក្នុងម៉ាស៊ីន។ ចុចរក្សាទុកមាតិកាវេបសាយដើម្បីអនុវត្ត។',
      questionImageUploaded: 'បានអាប់ឡូតរូបសំណួរ។',
      imageReadFailed: 'មិនអាចអានឯកសាររូបភាពដែលបានជ្រើសរើសបានទេ។',
      topicDeleted: 'បានលុបប្រធានបទ។',
      categoryUpdated: 'បានកែប្រែប្រភេទ។',
      categoryCreated: 'បានបង្កើតប្រភេទ។',
      categoryDeleted: 'បានលុបប្រភេទ។',
      questionUpdated: 'បានកែប្រែសំណួរ។',
      questionCreated: 'បានបង្កើតសំណួរ។',
      questionDeleted: 'បានលុបសំណួរ។',
      siteContentUpdated: 'បានធ្វើបច្ចុប្បន្នភាពមាតិកាវេបសាយដោយជោគជ័យ។',
      siteContentReset: 'បានកំណត់មាតិកាវេបសាយទៅតម្លៃដើមវិញ។',
      panelTitle: 'ផ្ទាំងគ្រប់គ្រង',
      backToWebsite: 'ត្រឡប់ទៅវេបសាយ',
      loginTitle: 'ចូលប្រើ Admin',
      email: 'អ៊ីមែល',
      password: 'ពាក្យសម្ងាត់',
      loginAsAdmin: 'ចូលជា Admin',
      loggingIn: 'កំពុងចូល...',
      loginWithGoogle: 'ចូលជាមួយ Google',
      redirectingToGoogle: 'កំពុងបញ្ជូនទៅ Google...',
      orContinueWith: 'ឬបន្តជាមួយ',
      googleAdminNotAllowed: 'គណនី Google នេះមិនត្រូវបានអនុញ្ញាតសម្រាប់ការចូលជា Admin ទេ។',
      showPassword: 'បង្ហាញ',
      hidePassword: 'លាក់',
      showPasswordAria: 'បង្ហាញពាក្យសម្ងាត់',
      hidePasswordAria: 'លាក់ពាក្យសម្ងាត់',
      overview: 'ទិដ្ឋភាពទូទៅ',
      siteContent: 'មាតិកាវេបសាយ',
      topics: 'ប្រធានបទ',
      categories: 'ប្រភេទ',
      questions: 'សំណួរ',
      logout: 'ចាកចេញ',
      managerTitle: 'ការគ្រប់គ្រងសំណួរ Admin',
      promoText: 'គ្រប់គ្រងមាតិកា ទិន្នន័យ និងម៉ាកសញ្ញារបស់វេបសាយសំណួរអ្នកនៅកន្លែងតែមួយ។',
      openSiteContent: 'បើកមាតិកាវេបសាយ',
      dashboardOverview: 'ផ្ទាំងទិដ្ឋភាពទូទៅ',
      dashboardOverviewDesc: 'តាមដានសកម្មភាពវេទិកាសំណួររបស់អ្នក និងចូលផ្នែកគ្រប់គ្រងបានរហ័ស។',
      availableQuizThemes: 'ប្រធានបទសំណួរដែលមាន',
      questionGroupingStatus: 'ស្ថានភាពក្រុមសំណួរ',
      totalChallengePool: 'ចំនួនសំណួរសរុប',
      contentDataActivity: 'សកម្មភាពមាតិកា និងទិន្នន័យ',
      trafficSources: 'ប្រភពអ្នកចូលទស្សនា',
      trafficLegend: 'ស្វែងរក • សង្គម • ផ្ទាល់',
      siteTask1: 'មាតិកាវេបសាយ៖ កែផ្នែក Hero, Banner, Cards និង Footer។',
      siteTask2: 'ប្រធានបទ៖ កំណត់ឈ្មោះ និងរូបភាពប្រធានបទ។',
      siteTask3: 'ប្រភេទ៖ រៀបចំសំណួរតាមប្រភេទ។',
      siteTask4: 'សំណួរ៖ បន្ថែម ឬកែសម្រួលសំណួរ និងភ្ជាប់ប្រធានបទ/ប្រភេទ។',
      manageHomeFooter: 'គ្រប់គ្រងមាតិកាទំព័រដើម + Footer',
      mainColor: 'ពណ៌មេ',
      heroTitle: 'ចំណងជើង Hero',
      heroText: 'អត្ថបទ Hero',
      heroImageUrl: 'តំណរូបភាព Hero',
      chooseLocalHeroImage: 'ឬជ្រើសរើសរូបភាព Hero ក្នុងម៉ាស៊ីន',
      uploadingHeroImage: 'កំពុងអាប់ឡូតរូបភាព Hero...',
      banner1ImageUrl: 'តំណរូបភាព Banner ១',
      chooseLocalBanner1Image: 'ឬជ្រើសរើសរូបភាព Banner ១ ក្នុងម៉ាស៊ីន',
      uploadingBanner1Image: 'កំពុងអាប់ឡូតរូបភាព Banner ១...',
      banner2ImageUrl: 'តំណរូបភាព Banner ២',
      chooseLocalBanner2Image: 'ឬជ្រើសរើសរូបភាព Banner ២ ក្នុងម៉ាស៊ីន',
      uploadingBanner2Image: 'កំពុងអាប់ឡូតរូបភាព Banner ២...',
      banner1Text: 'អត្ថបទ Banner ១',
      banner2Text: 'អត្ថបទ Banner ២',
      card1Title: 'ចំណងជើង Card 1',
      card1Text: 'អត្ថបទ Card 1',
      card2Title: 'ចំណងជើង Card 2',
      card2Text: 'អត្ថបទ Card 2',
      card3Title: 'ចំណងជើង Card 3',
      card3Text: 'អត្ថបទ Card 3',
      footerBrand: 'ម៉ាក Footer',
      footerDescription: 'ពិពណ៌នា Footer',
      footerEmail: 'អ៊ីមែល Footer',
      footerLocation: 'ទីតាំង Footer',
      githubUrl: 'តំណ GitHub',
      linkedInUrl: 'តំណ LinkedIn',
      facebookUrl: 'តំណ Facebook',
      footerCopyrightText: 'អត្ថបទកម្មសិទ្ធិ Footer',
      saveSiteContent: 'រក្សាទុកមាតិកាវេបសាយ',
      resetDefault: 'កំណត់ដើមវិញ',
      editTopic: 'កែប្រធានបទ',
      createTopic: 'បង្កើតប្រធានបទ',
      topicName: 'ឈ្មោះប្រធានបទ',
      topicImageUrl: 'តំណរូបភាពប្រធានបទ',
      chooseImageFile: 'ឬជ្រើសរើសឯកសាររូបភាព',
      uploadingImage: 'កំពុងអាប់ឡូតរូបភាព...',
      updateTopic: 'កែប្រែប្រធានបទ',
      addTopic: 'បន្ថែមប្រធានបទ',
      cancel: 'បោះបង់',
      questionsCount: 'សំណួរ',
      edit: 'កែ',
      delete: 'លុប',
      editCategory: 'កែប្រភេទ',
      createCategory: 'បង្កើតប្រភេទ',
      categoryName: 'ឈ្មោះប្រភេទ',
      description: 'ពិពណ៌នា',
      updateCategory: 'កែប្រែប្រភេទ',
      addCategory: 'បន្ថែមប្រភេទ',
      noDescription: 'គ្មានពិពណ៌នា',
      editQuestion: 'កែសំណួរ',
      createQuestion: 'បង្កើតសំណួរ',
      questionText: 'អត្ថបទសំណួរ',
      topic: 'ប្រធានបទ',
      selectExistingTopic: 'ជ្រើសរើសប្រធានបទដែលមានស្រាប់',
      noLinkedTopic: 'មិនភ្ជាប់ប្រធានបទ',
      chooseLocalTopicImage: 'ឬជ្រើសរើសរូបភាពប្រធានបទក្នុងម៉ាស៊ីន',
      uploadingQuestionImage: 'កំពុងអាប់ឡូតរូបភាពសំណួរ...',
      chooseImageOption: 'ជ្រើសរើសជម្រើសរូបភាព',
      chooseFromPresetList: 'ជ្រើសរើសពីបញ្ជីរួចជាស្រេច',
      clearImage: 'លុបរូបភាព',
      noCategory: 'គ្មានប្រភេទ',
      optionA: 'ជម្រើស A',
      optionB: 'ជម្រើស B',
      optionC: 'ជម្រើស C',
      optionD: 'ជម្រើស D',
      correctA: 'ត្រឹមត្រូវ៖ A',
      correctB: 'ត្រឹមត្រូវ៖ B',
      correctC: 'ត្រឹមត្រូវ៖ C',
      correctD: 'ត្រឹមត្រូវ៖ D',
      updateQuestion: 'កែប្រែសំណួរ',
      addQuestion: 'បន្ថែមសំណួរ',
      general: 'ទូទៅ',
      linkedToTopic: 'ភ្ជាប់ទៅប្រធានបទ',
      topicImageConfigured: 'បានកំណត់រូបភាពប្រធានបទ',
      correctAnswer: 'ចម្លើយត្រឹមត្រូវ',
    },
  },
};

const getInitialView = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return 'Admin';
  }

  return 'Home';
};

const emptyCategoryForm = {
  name: '',
  description: '',
};

const emptyTopicForm = {
  name: '',
  image_url: '',
};

const emptyQuestionForm = {
  text: '',
  topic: '',
  topic_image_url: '',
  topic_id: '',
  category_id: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  correct_answer: 'a',
};

const SITE_CONTENT_STORAGE_KEY = 'site_content_settings';
const LOCAL_SITE_IMAGE_MAX_BYTES = 2 * 1024 * 1024;

const defaultSiteContent = {
  mainColor: '#1e86ff',
  heroTitle: 'Rom Chamraeun',
  heroText:
    'Welcome to my official quiz game portfolio. Explore the website and challenge your full-stack knowledge in the Quiz menu.',
  heroImage:
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=60',
  bannerImage:
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60',
  banner1Image:
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60',
  banner2Image:
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60',
  banner1Text: 'Start your challenge now',
  banner2Text: 'Practice and improve every day',
  valueCard1Title: 'Timed Quiz',
  valueCard1Text: 'Fast-paced questions with countdown timer and instant feedback.',
  valueCard2Title: 'Topic-Based',
  valueCard2Text: 'Choose your favorite topic card and play right away.',
  valueCard3Title: 'Smart Score',
  valueCard3Text: 'Track points, streak, and accuracy in a modern challenge flow.',
  footerBrand: 'Quiz Platform',
  footerDescription: 'Interactive learning quiz built with Laravel + React.',
  footerEmail: 'rom@example.com',
  footerLocation: 'Phnom Penh, Cambodia',
  socialGithub: 'https://github.com',
  socialLinkedIn: 'https://linkedin.com',
  socialFacebook: 'https://facebook.com',
  footerCopy: 'All rights reserved.',
};

const KM_QUIZ_TRANSLATIONS = {
  topics: {
    'Laravel Basics': 'មូលដ្ឋាន Laravel',
    'React Hooks': 'React Hooks',
    'Mobile Legends': 'Mobile Legends',
  },
  categories: {
    Backend: 'ខាងក្រោយ',
    Frontend: 'ខាងមុខ',
    Gaming: 'ហ្គេម',
  },
  questions: {
    'Which programming language is used for Laravel?': {
      text: 'Laravel ប្រើភាសាកម្មវិធីមួយណា?',
      choices: {
        a: 'Python',
        b: 'PHP',
        c: 'JavaScript',
        d: 'Java',
      },
    },
    'In React, which hook is used to handle side effects?': {
      text: 'នៅក្នុង React តើ hook មួយណា ប្រើសម្រាប់គ្រប់គ្រង side effects?',
      choices: {
        a: 'useState',
        b: 'useContext',
        c: 'useEffect',
        d: 'useReducer',
      },
    },
    'Which Mobile Legends hero is known for the "Ocean Oddity" skill?': {
      text: 'តួអង្គ Mobile Legends មួយណា ដែលល្បីជាមួយសមត្ថភាព "Ocean Oddity"?',
      choices: {
        a: 'Eudora',
        b: 'Kadita',
        c: 'Aurora',
        d: 'Odette',
      },
    },
  },
};

const shuffleQuestions = (questions) => {
  const list = [...questions];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const normalizeQuestion = (question) => ({
  id: question.id,
  category: question.category?.name ?? 'General',
  topic: question.topic ?? 'General',
  topicImageUrl: question.topic_image_url ?? '',
  text: question.text,
  choices: {
    a: question.option_a,
    b: question.option_b,
    c: question.option_c,
    d: question.option_d,
  },
  answer: question.correct_answer,
});

const localizeQuizQuestion = (question, language) => {
  if (language !== 'km') {
    return question;
  }

  const translatedTopic = KM_QUIZ_TRANSLATIONS.topics[question.topic] ?? question.topic;
  const translatedCategory = KM_QUIZ_TRANSLATIONS.categories[question.category] ?? question.category;
  const translatedQuestion = KM_QUIZ_TRANSLATIONS.questions[question.text];

  if (!translatedQuestion) {
    return {
      ...question,
      topic: translatedTopic,
      category: translatedCategory,
    };
  }

  return {
    ...question,
    text: translatedQuestion.text,
    topic: translatedTopic,
    category: translatedCategory,
    choices: {
      ...question.choices,
      ...translatedQuestion.choices,
    },
  };
};

const TOPIC_IMAGE_MAP = {
  all: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
  laravel: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
  react: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80',
  javascript: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  php: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
  api: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
  database: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80',
  postgresql: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
  mysql: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  devops: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80',
  docker: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=900&q=80',
  git: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80',
  testing: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80',
  frontend: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80',
  backend: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
};

const fallbackTopicImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
];

const formatTopicLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const topicImagePresetOptions = [
  ...Object.entries(TOPIC_IMAGE_MAP).map(([key, url]) => ({
    label: key === 'all' ? 'General Quiz' : formatTopicLabel(key),
    url,
  })),
  ...fallbackTopicImages.map((url, index) => ({
    label: `Preset ${index + 1}`,
    url,
  })),
];

const hashTopicName = (value) => {
  return String(value)
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

const getTopicImageUrl = (topicName) => {
  if (typeof topicName === 'string' && /^https?:\/\//i.test(topicName)) {
    return topicName;
  }

  const normalized = (topicName || 'general').toLowerCase();

  const mappedImage = Object.entries(TOPIC_IMAGE_MAP).find(([key]) =>
    normalized.includes(key),
  )?.[1];

  if (mappedImage) {
    return mappedImage;
  }

  const index = hashTopicName(normalized) % fallbackTopicImages.length;
  return fallbackTopicImages[index];
};

const readImageFileAsDataUrl = (file, errorMessage = 'Unable to read selected image file.') =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(errorMessage));
    reader.readAsDataURL(file);
  });

const normalizeHexColor = (value) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    return null;
  }

  if (trimmed.length === 4) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return trimmed.toLowerCase();
};

const hexToRgb = (hex) => {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return null;
  }

  const value = normalized.slice(1);
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
};

const rgbToHex = (rgb) => {
  const toHex = (channel) => {
    const clamped = Math.max(0, Math.min(255, Math.round(channel)));
    return clamped.toString(16).padStart(2, '0');
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

const blendHexColors = (baseHex, targetHex, targetRatio) => {
  const base = hexToRgb(baseHex);
  const target = hexToRgb(targetHex);

  if (!base || !target) {
    return normalizeHexColor(baseHex) ?? '#1e86ff';
  }

  const ratio = Math.max(0, Math.min(1, targetRatio));

  return rgbToHex({
    r: base.r + (target.r - base.r) * ratio,
    g: base.g + (target.g - base.g) * ratio,
    b: base.b + (target.b - base.b) * ratio,
  });
};

function App() {
  const loadSiteContent = () => {
    if (typeof window === 'undefined') {
      return defaultSiteContent;
    }

    try {
      const stored = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (!stored) {
        return defaultSiteContent;
      }

      const parsed = JSON.parse(stored);
      return {
        ...defaultSiteContent,
        ...parsed,
      };
    } catch (_error) {
      return defaultSiteContent;
    }
  };

  const [activeView, setActiveView] = useState(getInitialView);
  const [language, setLanguage] = useState(() => localStorage.getItem('app_lang') ?? 'en');
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') ?? 'light');
  const [publicQuestions, setPublicQuestions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [quizSearchInput, setQuizSearchInput] = useState('');
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [lastEarned, setLastEarned] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('admin_token') ?? '');
  const [adminUser, setAdminUser] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoggingIn, setAdminLoggingIn] = useState(false);
  const [adminGoogleLoggingIn, setAdminGoogleLoggingIn] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminNotice, setAdminNotice] = useState('');
  const [adminTab, setAdminTab] = useState('overview');
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [adminQuestions, setAdminQuestions] = useState([]);
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [topicForm, setTopicForm] = useState(emptyTopicForm);
  const [questionForm, setQuestionForm] = useState(emptyQuestionForm);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [topicImageUploading, setTopicImageUploading] = useState(false);
  const [questionImageUploading, setQuestionImageUploading] = useState(false);
  const [siteHeroImageUploading, setSiteHeroImageUploading] = useState(false);
  const [siteBanner1ImageUploading, setSiteBanner1ImageUploading] = useState(false);
  const [siteBanner2ImageUploading, setSiteBanner2ImageUploading] = useState(false);
  const [siteContent, setSiteContent] = useState(loadSiteContent);
  const [siteContentForm, setSiteContentForm] = useState(loadSiteContent);

  const isAdminRoute =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  const t = translations[language] ?? translations.en;
  const adminText = t.admin ?? translations.en.admin;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const adminTokenFromQuery = url.searchParams.get('admin_token');
    const adminErrorFromQuery = url.searchParams.get('admin_error');

    if (!adminTokenFromQuery && !adminErrorFromQuery) {
      return;
    }

    if (adminErrorFromQuery) {
      const normalizedError = adminErrorFromQuery.trim();
      const isGoogleAdminDeniedError =
        normalizedError === 'This Google account is not allowed for admin login.' ||
        normalizedError === 'This Google account is not allowed. Email not found in database.';

      setAdminError(isGoogleAdminDeniedError ? adminText.googleAdminNotAllowed : adminErrorFromQuery);
      setAdminNotice('');
    } else {
      const adminNameFromQuery = url.searchParams.get('admin_name') ?? 'Google Admin';
      const adminEmailFromQuery = url.searchParams.get('admin_email') ?? '';

      setAdminToken(adminTokenFromQuery);
      setAdminUser({
        name: adminNameFromQuery,
        email: adminEmailFromQuery,
      });
      localStorage.setItem('admin_token', adminTokenFromQuery);
      setAdminError('');
      setAdminNotice(adminText.adminLoginSuccessful);
      setActiveView('Admin');
    }

    setAdminGoogleLoggingIn(false);
    url.searchParams.delete('admin_token');
    url.searchParams.delete('admin_name');
    url.searchParams.delete('admin_email');
    url.searchParams.delete('admin_error');
    window.history.replaceState({}, '', `${url.pathname}${url.hash}`);
  }, [adminText.adminLoginSuccessful, adminText.googleAdminNotAllowed]);

  const getLocalizedSiteValue = (value, englishDefault, translatedDefault) => {
    const normalized = typeof value === 'string' ? value.trim() : '';
    const englishDefaults = Array.isArray(englishDefault) ? englishDefault : [englishDefault];
    if (!normalized || englishDefaults.includes(normalized)) {
      return translatedDefault;
    }
    return value;
  };

  const heroTitle = getLocalizedSiteValue(
    siteContent.heroTitle,
    [defaultSiteContent.heroTitle, translations.en.brandName, translations.en.heroTitleEducation],
    siteContent.heroTitle?.trim() === translations.en.heroTitleEducation ? t.heroTitleEducation : t.brandName,
  );

  const heroText = getLocalizedSiteValue(
    siteContent.heroText,
    [defaultSiteContent.heroText, translations.en.heroCopy],
    t.heroCopy,
  );

  const banner1Text = getLocalizedSiteValue(
    siteContent.banner1Text,
    [defaultSiteContent.banner1Text, translations.en.banner1TextDefault],
    t.banner1TextDefault,
  );

  const banner2Text = getLocalizedSiteValue(
    siteContent.banner2Text,
    [defaultSiteContent.banner2Text, translations.en.banner2TextDefault],
    t.banner2TextDefault,
  );

  const valueCard1Title = getLocalizedSiteValue(
    siteContent.valueCard1Title,
    defaultSiteContent.valueCard1Title,
    t.valueCard1TitleDefault,
  );
  const valueCard1Text = getLocalizedSiteValue(
    siteContent.valueCard1Text,
    defaultSiteContent.valueCard1Text,
    t.valueCard1TextDefault,
  );
  const valueCard2Title = getLocalizedSiteValue(
    siteContent.valueCard2Title,
    defaultSiteContent.valueCard2Title,
    t.valueCard2TitleDefault,
  );
  const valueCard2Text = getLocalizedSiteValue(
    siteContent.valueCard2Text,
    defaultSiteContent.valueCard2Text,
    t.valueCard2TextDefault,
  );
  const valueCard3Title = getLocalizedSiteValue(
    siteContent.valueCard3Title,
    defaultSiteContent.valueCard3Title,
    t.valueCard3TitleDefault,
  );
  const valueCard3Text = getLocalizedSiteValue(
    siteContent.valueCard3Text,
    defaultSiteContent.valueCard3Text,
    t.valueCard3TextDefault,
  );

  const mainColor = normalizeHexColor(siteContent.mainColor) ?? defaultSiteContent.mainColor;
  const accentBlue = mainColor;
  const accentCyan = blendHexColors(mainColor, '#11bfae', 0.44);
  const accentCoral = blendHexColors(mainColor, '#ff8f5a', 0.34);
  const surfaceIce = blendHexColors(mainColor, '#f3f9ff', 0.85);
  const inkStrong = blendHexColors(mainColor, '#0f2f57', 0.74);

  const localizedPublicQuestions = useMemo(
    () => publicQuestions.map((question) => localizeQuizQuestion(question, language)),
    [publicQuestions, language],
  );

  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(siteContent));
  }, [siteContent]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleQuizSearchSubmit = (event) => {
    event.preventDefault();
    setActiveView('Quiz');
    setQuizSearchQuery(quizSearchInput.trim());
    setSelectedTopic('all');
    setStarted(false);
    setCompleted(false);
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeLeft(QUESTION_TIME);
    setLastEarned(0);
  };

  const handleQuizSearchInputChange = (event) => {
    const nextValue = event.target.value;
    setQuizSearchInput(nextValue);

    if (nextValue.trim() !== '') {
      return;
    }

    setQuizSearchQuery('');
    setSelectedTopic('all');
    setStarted(false);
    setCompleted(false);
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeLeft(QUESTION_TIME);
    setLastEarned(0);
  };

  const apiRequest = async (path, options = {}) => {
    const { method = 'GET', body, token } = options;

    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message ?? t.requestFailed);
    }

    return data;
  };

  const fetchPublicQuestions = async () => {
    try {
      const response = await apiRequest('/questions');
      if (Array.isArray(response)) {
        setPublicQuestions(response.map(normalizeQuestion));
      } else {
        setPublicQuestions([]);
      }
    } catch (_error) {
      setPublicQuestions([]);
    }
  };

  const fetchAdminDashboardData = async (tokenValue) => {
    const [categoryData, topicData, questionData] = await Promise.all([
      apiRequest('/admin/categories', { token: tokenValue }),
      apiRequest('/admin/topics', { token: tokenValue }),
      apiRequest('/admin/questions', { token: tokenValue }),
    ]);

    setCategories(categoryData);
    setTopics(topicData);
    setAdminQuestions(questionData);
  };

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  const progress = useMemo(() => {
    if (!started) return 0;
    if (completed) return 100;
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [started, completed, currentIndex, totalQuestions]);

  const accuracy = useMemo(() => {
    if (!totalQuestions || !started) return 0;
    const answered = correctCount + wrongCount + timeoutCount;
    if (!answered) return 0;
    return Math.round((correctCount / answered) * 100);
  }, [totalQuestions, started, correctCount, wrongCount, timeoutCount]);

  const preparedTopics = useMemo(() => {
    const topicCountMap = localizedPublicQuestions.reduce((acc, question) => {
      const topicName = question.topic?.trim() || 'General';
      const previous = acc.get(topicName) ?? { count: 0, imageUrl: '' };

      acc.set(topicName, {
        count: previous.count + 1,
        imageUrl: previous.imageUrl || question.topicImageUrl || '',
      });

      return acc;
    }, new Map());

    return Array.from(topicCountMap.entries())
      .map(([name, value]) => ({
        name,
        count: value.count,
        imageUrl: value.imageUrl,
      }))
      .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
  }, [localizedPublicQuestions]);

  const normalizedQuizSearchQuery = quizSearchQuery.trim().toLowerCase();

  const searchableQuestions = useMemo(() => {
    if (!normalizedQuizSearchQuery) {
      return localizedPublicQuestions;
    }

    return localizedPublicQuestions.filter((question) => {
      const topicName = question.topic?.trim() || 'General';
      const searchableText = [
        question.text,
        question.category,
        topicName,
        question.choices?.a,
        question.choices?.b,
        question.choices?.c,
        question.choices?.d,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuizSearchQuery);
    });
  }, [localizedPublicQuestions, normalizedQuizSearchQuery]);

  const filteredPreparedTopics = useMemo(() => {
    if (!normalizedQuizSearchQuery) {
      return preparedTopics;
    }

    const matchedTopicNames = new Set(
      searchableQuestions.map((question) => question.topic?.trim() || 'General'),
    );

    return preparedTopics.filter((topic) => matchedTopicNames.has(topic.name));
  }, [preparedTopics, searchableQuestions, normalizedQuizSearchQuery]);

  const selectedTopicQuestions = useMemo(() => {
    if (selectedTopic === 'all') {
      return searchableQuestions;
    }

    return searchableQuestions.filter((question) => {
      const topicName = question.topic?.trim() || 'General';
      return topicName === selectedTopic;
    });
  }, [searchableQuestions, selectedTopic]);

  useEffect(() => {
    fetchPublicQuestions();
  }, []);

  useEffect(() => {
    if (!started || completed || selectedAnswer) {
      return;
    }

    if (timeLeft <= 0) {
      setSelectedAnswer('timeout');
      setTimeoutCount((prev) => prev + 1);
      setStreak(0);
      setLastEarned(0);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [started, completed, selectedAnswer, timeLeft]);

  useEffect(() => {
    if (!adminToken) {
      setCategories([]);
      setTopics([]);
      setAdminQuestions([]);
      return;
    }

    fetchAdminDashboardData(adminToken).catch((error) => {
      setAdminError(error.message);
    });
  }, [adminToken]);

  const launchQuiz = () => {
    if (!selectedTopicQuestions.length) {
      setAdminNotice(adminText.noQuestionsAvailable);
      return;
    }

    setQuizQuestions(shuffleQuestions(selectedTopicQuestions));
    setStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeoutCount(0);
    setStreak(0);
    setBestStreak(0);
    setLastEarned(0);
    setTimeLeft(QUESTION_TIME);
    setCompleted(false);
    setAdminNotice('');
  };

  const startQuizFromTopic = (topicName) => {
    setSelectedTopic(topicName);

    const topicQuestions =
      topicName === 'all'
        ? searchableQuestions
        : searchableQuestions.filter((question) => {
            const normalizedTopic = question.topic?.trim() || 'General';
            return normalizedTopic === topicName;
          });

    if (!topicQuestions.length) {
      setAdminNotice(adminText.noQuestionsForTopic);
      return;
    }

    setQuizQuestions(shuffleQuestions(topicQuestions));
    setStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeoutCount(0);
    setStreak(0);
    setBestStreak(0);
    setLastEarned(0);
    setTimeLeft(QUESTION_TIME);
    setCompleted(false);
    setAdminNotice('');
  };

  const handleSelect = (choiceKey) => {
    if (selectedAnswer) return;
    setSelectedAnswer(choiceKey);

    if (choiceKey === currentQuestion.answer) {
      const earned = 100 + timeLeft * 4 + streak * 15;
      const updatedStreak = streak + 1;

      setScore((prev) => prev + earned);
      setCorrectCount((prev) => prev + 1);
      setStreak(updatedStreak);
      setBestStreak((prev) => Math.max(prev, updatedStreak));
      setLastEarned(earned);
    } else {
      setWrongCount((prev) => prev + 1);
      setStreak(0);
      setLastEarned(0);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(QUESTION_TIME);
      return;
    }

    setCompleted(true);
  };

  const exitQuizToSetup = () => {
    setStarted(false);
    setCompleted(false);
    setQuizQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeLeft(QUESTION_TIME);
    setLastEarned(0);
  };

  const handleCancelQuiz = () => {
    exitQuizToSetup();
    setAdminNotice(adminText.quizCancelled);
  };

  const handleBackToHome = () => {
    exitQuizToSetup();
    setActiveView('Home');
  };

  const restartQuiz = () => launchQuiz();

  const statusText = (() => {
    if (!selectedAnswer) return t.quizPickOption;
    if (selectedAnswer === 'timeout') return t.quizTimesUp;
    if (selectedAnswer === currentQuestion.answer)
      return `${t.quizCorrectAnswer} +${lastEarned} ${t.pointsShort}`;
    return t.quizNotCorrect;
  })();

  const timerClass = timeLeft <= 5 ? 'timer-chip warning' : 'timer-chip';

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    if (adminLoggingIn || adminGoogleLoggingIn) return;

    setAdminError('');
    setAdminNotice('');
    setAdminLoggingIn(true);

    try {
      const payload = await apiRequest('/admin/login', {
        method: 'POST',
        body: {
          email: adminEmail,
          password: adminPassword,
        },
      });

      setAdminToken(payload.token);
      setAdminUser(payload.admin);
      localStorage.setItem('admin_token', payload.token);
      setAdminNotice(adminText.adminLoginSuccessful);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setAdminLoggingIn(false);
    }
  };

  const handleAdminGoogleLogin = async () => {
    if (adminLoggingIn || adminGoogleLoggingIn) return;

    setAdminError('');
    setAdminNotice('');
    setAdminGoogleLoggingIn(true);

    try {
      const payload = await apiRequest('/admin/google/redirect');

      if (!payload?.url) {
        throw new Error(t.requestFailed);
      }

      window.location.assign(payload.url);
    } catch (error) {
      setAdminError(error.message);
      setAdminGoogleLoggingIn(false);
    }
  };

  const handleAdminLogout = async () => {
    if (adminToken) {
      try {
        await apiRequest('/admin/logout', {
          method: 'POST',
          token: adminToken,
        });
      } catch (_error) {
        // Ignore logout network errors and clear local state.
      }
    }

    localStorage.removeItem('admin_token');
    setAdminToken('');
    setAdminUser(null);
    setAdminTab('overview');
    setAdminNotice(adminText.loggedOut);
    setAdminError('');
  };

  const submitTopic = async (event) => {
    event.preventDefault();
    setAdminError('');

    const payload = {
      ...topicForm,
      image_url: topicForm.image_url.trim() || null,
    };

    try {
      if (editingTopicId) {
        await apiRequest(`/admin/topics/${editingTopicId}`, {
          method: 'PUT',
          token: adminToken,
          body: payload,
        });
        setAdminNotice(adminText.topicUpdated);
      } else {
        await apiRequest('/admin/topics', {
          method: 'POST',
          token: adminToken,
          body: payload,
        });
        setAdminNotice(adminText.topicCreated);
      }

      setTopicForm(emptyTopicForm);
      setEditingTopicId(null);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const uploadAdminImageFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE}/admin/topics/upload-image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message ?? t.imageUploadFailed);
    }

    return data.image_url ?? '';
  };

  const uploadTopicImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !adminToken) {
      return;
    }

    setAdminError('');
    setTopicImageUploading(true);

    try {
      const imageUrl = await uploadAdminImageFile(file);
      setTopicForm((prev) => ({ ...prev, image_url: imageUrl }));
      setAdminNotice(adminText.topicImageUploaded);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setTopicImageUploading(false);
      event.target.value = '';
    }
  };

  const uploadSiteImage = async (event, imageField) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setAdminError(adminText.selectImageFile);
      event.target.value = '';
      return;
    }

    if (file.size > LOCAL_SITE_IMAGE_MAX_BYTES) {
      setAdminError(adminText.imageTooLarge);
      event.target.value = '';
      return;
    }

    setAdminError('');
    if (imageField === 'heroImage') {
      setSiteHeroImageUploading(true);
    } else if (imageField === 'banner1Image') {
      setSiteBanner1ImageUploading(true);
    } else if (imageField === 'banner2Image') {
      setSiteBanner2ImageUploading(true);
    }

    try {
      const imageUrl = await readImageFileAsDataUrl(file, adminText.imageReadFailed);
      setSiteContentForm((prev) => ({
        ...prev,
        [imageField]: imageUrl,
      }));
      setAdminNotice(adminText.localImageSelected);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      if (imageField === 'heroImage') {
        setSiteHeroImageUploading(false);
      } else if (imageField === 'banner1Image') {
        setSiteBanner1ImageUploading(false);
      } else if (imageField === 'banner2Image') {
        setSiteBanner2ImageUploading(false);
      }
      event.target.value = '';
    }
  };

  const uploadQuestionImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !adminToken) {
      return;
    }

    setAdminError('');
    setQuestionImageUploading(true);

    try {
      const imageUrl = await uploadAdminImageFile(file);
      setQuestionForm((prev) => ({ ...prev, topic_image_url: imageUrl }));
      setAdminNotice(adminText.questionImageUploaded);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setQuestionImageUploading(false);
      event.target.value = '';
    }
  };

  const editTopic = (topic) => {
    setEditingTopicId(topic.id);
    setTopicForm({
      name: topic.name,
      image_url: topic.image_url ?? '',
    });
    setAdminTab('topics');
  };

  const deleteTopic = async (topicId) => {
    setAdminError('');

    try {
      await apiRequest(`/admin/topics/${topicId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      setAdminNotice(adminText.topicDeleted);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const submitCategory = async (event) => {
    event.preventDefault();
    setAdminError('');

    try {
      if (editingCategoryId) {
        await apiRequest(`/admin/categories/${editingCategoryId}`, {
          method: 'PUT',
          token: adminToken,
          body: categoryForm,
        });
        setAdminNotice(adminText.categoryUpdated);
      } else {
        await apiRequest('/admin/categories', {
          method: 'POST',
          token: adminToken,
          body: categoryForm,
        });
        setAdminNotice(adminText.categoryCreated);
      }

      setCategoryForm(emptyCategoryForm);
      setEditingCategoryId(null);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const submitQuestion = async (event) => {
    event.preventDefault();
    setAdminError('');

    const payload = {
      ...questionForm,
      topic_image_url: questionForm.topic_image_url.trim() || null,
      topic_id: questionForm.topic_id ? Number(questionForm.topic_id) : null,
      category_id: questionForm.category_id ? Number(questionForm.category_id) : null,
    };

    try {
      if (editingQuestionId) {
        await apiRequest(`/admin/questions/${editingQuestionId}`, {
          method: 'PUT',
          token: adminToken,
          body: payload,
        });
        setAdminNotice(adminText.questionUpdated);
      } else {
        await apiRequest('/admin/questions', {
          method: 'POST',
          token: adminToken,
          body: payload,
        });
        setAdminNotice(adminText.questionCreated);
      }

      setQuestionForm(emptyQuestionForm);
      setEditingQuestionId(null);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const editCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category.name,
      description: category.description ?? '',
    });
    setAdminTab('categories');
  };

  const deleteCategory = async (categoryId) => {
    setAdminError('');

    try {
      await apiRequest(`/admin/categories/${categoryId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      setAdminNotice(adminText.categoryDeleted);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const editQuestion = (question) => {
    setEditingQuestionId(question.id);
    setQuestionForm({
      text: question.text,
      topic: question.topic ?? '',
      topic_image_url: question.topic_image_url ?? '',
      topic_id: question.topic_id ? String(question.topic_id) : '',
      category_id: question.category_id ? String(question.category_id) : '',
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_answer: question.correct_answer,
    });
    setAdminTab('questions');
  };

  const deleteQuestion = async (questionId) => {
    setAdminError('');

    try {
      await apiRequest(`/admin/questions/${questionId}`, {
        method: 'DELETE',
        token: adminToken,
      });
      setAdminNotice(adminText.questionDeleted);
      await fetchAdminDashboardData(adminToken);
      await fetchPublicQuestions();
    } catch (error) {
      setAdminError(error.message);
    }
  };

  const handleSiteContentSubmit = (event) => {
    event.preventDefault();
    setSiteContent(siteContentForm);
    setAdminNotice(adminText.siteContentUpdated);
    setAdminError('');
  };

  const resetSiteContent = () => {
    setSiteContentForm(defaultSiteContent);
    setSiteContent(defaultSiteContent);
    setAdminNotice(adminText.siteContentReset);
    setAdminError('');
  };

  return (
    <main
      className={`site-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}
      style={{
        '--accent-blue': accentBlue,
        '--accent-cyan': accentCyan,
        '--accent-coral': accentCoral,
        '--surface-ice': surfaceIce,
        '--ink-strong': inkStrong,
      }}
    >
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-orb orb-a" />
        <span className="ambient-orb orb-b" />
        <span className="ambient-orb orb-c" />
      </div>

      <header className="top-header">
        <div className="brand-search-group">
          <button type="button" className="brand-group brand-home-btn" onClick={handleBackToHome}>
            <span className="brand-dot" aria-hidden="true" />
            <div className="brand-text">
              <strong>{t.brandName}</strong>
              <small>{t.brandTagline}</small>
            </div>
          </button>
          {!isAdminRoute && (
            <form className="header-search" onSubmit={handleQuizSearchSubmit} role="search">
              <span>{t.searchQuiz}</span>
              <input
                id="quiz-header-search"
                type="text"
                value={quizSearchInput}
                onChange={handleQuizSearchInputChange}
                placeholder={t.searchQuizPlaceholder}
              />
              <button type="submit" className="header-search-btn">
                {t.searchButton}
              </button>
            </form>
          )}
        </div>
        <div className="header-main-right">
          <div className="header-controls">
            <p className="header-tagline">
              {isAdminRoute ? t.headerAdminTagline : t.headerClientTagline}
            </p>
            {!isAdminRoute && (
              <nav className="header-nav" aria-label={t.ariaMainMenu}>
                {navItems.map((item) => (
                  <button
                    key={item}
                    className={`menu-btn ${activeView === item ? 'active' : ''}`}
                    onClick={() => setActiveView(item)}
                  >
                    {t.nav[item] ?? item}
                  </button>
                ))}
              </nav>
            )}
            <label className="language-select" htmlFor="language-select">
              <span>{t.langLabel}</span>
              <select
                id="language-select"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.flag} {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? `☀️ ${t.lightMode}` : `🌙 ${t.darkMode}`}
            </button>
          </div>
        </div>
      </header>

      <div className={`layout-shell ${isAdminRoute ? 'admin-layout' : ''}`}>
        <section className={`content-area ${isAdminRoute ? 'admin-content' : ''}`}>
          {activeView === 'Home' && (
            <div className="home-page">
              <p className="page-badge">{t.homePageBadge}</p>
              <div className="banner-card">
                <div
                  className="profile-photo"
                  role="img"
                  aria-label={t.ariaProfilePhoto}
                  style={{
                    backgroundImage: `linear-gradient(145deg, rgba(15, 39, 73, 0.1), rgba(15, 39, 73, 0.01)), url(${siteContent.heroImage || defaultSiteContent.heroImage})`,
                  }}
                />
                <div>
                  <p className="eyebrow">{t.heroSection}</p>
                  <h1>{heroTitle}</h1>
                  <p className="hero-copy">{heroText}</p>
                  <div className="inline-actions hero-cta-row">
                    <button className="primary-btn" onClick={() => setActiveView('Quiz')}>
                      {t.startQuizNow}
                    </button>
                  </div>
                </div>
              </div>

              <div className="hero-media-grid">
                {[1, 2].map((bannerNumber) => (
                  <div
                    key={bannerNumber}
                    className="hero-media"
                    role="img"
                    aria-label={`${t.ariaHeroArtwork} ${bannerNumber}`}
                    style={{
                      backgroundImage: `linear-gradient(160deg, rgba(21, 54, 98, 0.2), rgba(30, 67, 116, 0.08)), url(${bannerNumber === 1 ? siteContent.banner1Image || siteContent.bannerImage || defaultSiteContent.banner1Image : siteContent.banner2Image || siteContent.bannerImage || defaultSiteContent.banner2Image})`,
                    }}
                  >
                    <div className="hero-media-caption">
                      <p>{t.heroSection}</p>
                      <strong>
                        {bannerNumber === 1 ? banner1Text : banner2Text}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="value-grid" aria-label={t.ariaHighlights}>
                <article className="value-card">
                  <h3>{valueCard1Title}</h3>
                  <p>{valueCard1Text}</p>
                </article>
                <article className="value-card">
                  <h3>{valueCard2Title}</h3>
                  <p>{valueCard2Text}</p>
                </article>
                <article className="value-card">
                  <h3>{valueCard3Title}</h3>
                  <p>{valueCard3Text}</p>
                </article>
              </div>

              <section className="topics-panel">
                <div className="topics-head">
                  <h2>{t.preparedTopics}</h2>
                  <p>{t.preparedTopicsDesc}</p>
                </div>

                {filteredPreparedTopics.length ? (
                  <div className="topic-grid">
                    {filteredPreparedTopics.map((topic) => (
                      <article key={topic.name} className="topic-card">
                        <div
                          className="topic-card-image"
                          style={{ backgroundImage: `url(${getTopicImageUrl(topic.imageUrl || topic.name)})` }}
                          aria-hidden="true"
                        />
                        <strong>{topic.name === 'General' ? t.general : topic.name}</strong>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="topic-empty">
                    {normalizedQuizSearchQuery ? t.noSearchResults : t.noTopics}
                  </p>
                )}
              </section>
            </div>
          )}

          {activeView === 'Quiz' && (
            <div className="quiz-panel">
              <p className="page-badge">{t.quizPageBadge}</p>
              {!localizedPublicQuestions.length && <p>{t.noQuizQuestions}</p>}

              {!started && (
                <div className="intro-block">
                  <h2>{t.quizWelcome}</h2>
                  <p>{t.quizWelcomeDesc}</p>
                  <p className="prepared-topic-line">{t.clickTopicStart}</p>

                  <div className="topic-choice-grid" role="list" aria-label={t.ariaChooseTopic}>
                    <button
                      type="button"
                      role="listitem"
                      className={`topic-choice-card ${selectedTopic === 'all' ? 'selected' : ''}`}
                      onClick={() => startQuizFromTopic('all')}
                    >
                      <div
                        className="topic-choice-image"
                        style={{ backgroundImage: `url(${getTopicImageUrl('all topics quiz')})` }}
                        aria-hidden="true"
                      />
                      <div className="topic-choice-text">
                        <strong>{t.allTopics}</strong>
                      </div>
                    </button>

                    {filteredPreparedTopics.map((topic) => (
                      <button
                        key={topic.name}
                        type="button"
                        role="listitem"
                        className={`topic-choice-card ${selectedTopic === topic.name ? 'selected' : ''}`}
                        onClick={() => startQuizFromTopic(topic.name)}
                      >
                        <div
                          className="topic-choice-image"
                          style={{ backgroundImage: `url(${getTopicImageUrl(topic.imageUrl || topic.name)})` }}
                          aria-hidden="true"
                        />
                        <div className="topic-choice-text">
                          <strong>{topic.name === 'General' ? t.general : topic.name}</strong>
                        </div>
                      </button>
                    ))}
                  </div>

                  {normalizedQuizSearchQuery && !searchableQuestions.length && (
                    <p className="topic-empty">{t.noSearchResults}</p>
                  )}

                  {selectedTopic !== 'all' && !selectedTopicQuestions.length && (
                    <p className="topic-empty">{t.noTopicQuestions}</p>
                  )}
                  <div className="inline-actions quiz-actions">
                    <button className="secondary-btn" onClick={handleBackToHome}>
                      {t.back}
                    </button>
                  </div>
                </div>
              )}

              {started && !completed && (
                <div className="question-block">
                  <div className="question-head">
                    <span className="chip">{currentQuestion.category === 'General' ? t.general : currentQuestion.category}</span>
                    <div className="question-meta">
                      <span className="meta-chip question-count-chip">
                        {t.questionLabel} {currentIndex + 1} / {totalQuestions}
                      </span>
                      <span className="meta-chip">{t.scoreLabel} {score}</span>
                      <span className="meta-chip">{t.streakLabel} {streak}</span>
                      <span className={timerClass}>{t.timeLabel} {timeLeft}s</span>
                    </div>
                  </div>

                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progress}
                  >
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>

                  <h3 className="play-question">{currentQuestion.text}</h3>
                  <p className="question-topic">
                    {t.topicLabel}: {currentQuestion.topic === 'General' ? t.general : currentQuestion.topic}
                  </p>

                  <div className="answers-grid">
                    {Object.entries(currentQuestion.choices).map(([key, label], index) => {
                      const isCorrect = key === currentQuestion.answer;
                      const isSelected = key === selectedAnswer;
                      const showCorrect = selectedAnswer && isCorrect;
                      const showWrong =
                        selectedAnswer && selectedAnswer !== 'timeout' && isSelected && !isCorrect;

                      return (
                        <button
                          key={key}
                          className={`answer-btn ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                          style={{ animationDelay: `${index * 70}ms` }}
                          onClick={() => handleSelect(key)}
                          disabled={Boolean(selectedAnswer)}
                        >
                          <span className="option-key">{key.toUpperCase()}</span>
                          <span className="answer-label">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="answer-status">{statusText}</p>

                  <div className="inline-actions quiz-actions">
                    <button className="primary-btn" onClick={handleNext} disabled={!selectedAnswer}>
                      {currentIndex + 1 === totalQuestions ? t.seeResults : t.nextQuestion}
                    </button>
                    <button className="secondary-btn" onClick={handleCancelQuiz}>
                      {t.cancelQuiz}
                    </button>
                  </div>
                </div>
              )}

              {started && completed && (
                <div className="result-block">
                  <div className="result-layout">
                    <section className="result-score-card" aria-label={t.ariaFinalScore}>
                      <p className="result-label">{t.resultYourResult}</p>
                      <div className="result-score-ring" aria-hidden="true">
                        <strong>{accuracy}</strong>
                        <small>{t.resultOf100}</small>
                      </div>
                      <h2>
                        {accuracy >= 90
                          ? t.resultExcellent
                          : accuracy >= 75
                            ? t.resultGreat
                            : accuracy >= 55
                              ? t.resultGood
                              : t.resultKeepGoing}
                      </h2>
                      <p className="result-note">
                        {accuracy >= 90
                          ? t.resultNoteExcellent
                          : accuracy >= 70
                            ? t.resultNoteStrong
                            : t.resultNotePractice}
                      </p>
                    </section>

                    <section className="result-summary-card" aria-label={t.ariaResultSummary}>
                      <h3>{t.resultSummary}</h3>
                      <ul className="result-summary-list">
                        <li>
                          <span className="result-dot dot-accuracy" />
                          <span>{t.resultAccuracy}</span>
                          <strong>{accuracy} / 100</strong>
                        </li>
                        <li>
                          <span className="result-dot dot-correct" />
                          <span>{t.resultCorrect}</span>
                          <strong>{correctCount} / {totalQuestions}</strong>
                        </li>
                        <li>
                          <span className="result-dot dot-wrong" />
                          <span>{t.resultWrong}</span>
                          <strong>{wrongCount} / {totalQuestions}</strong>
                        </li>
                        <li>
                          <span className="result-dot dot-streak" />
                          <span>{t.resultBestStreak}</span>
                          <strong>{bestStreak}</strong>
                        </li>
                      </ul>

                      <button className="result-continue-btn" onClick={exitQuizToSetup}>
                        {t.resultContinue}
                      </button>
                      <button className="result-replay-btn" onClick={restartQuiz}>
                        {t.resultPlayAgain}
                      </button>
                    </section>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'Admin' && (
            <div className={`admin-panel ${!adminToken ? 'admin-login-page' : ''}`}>
              {!adminToken ? (
                <div className="admin-login-shell">
                  <section className="admin-login-brand" aria-hidden="true">
                    <p className="admin-login-kicker">{adminText.panelTitle}</p>
                    <h2>{adminText.managerTitle}</h2>
                    <p>{adminText.promoText}</p>
                  </section>

                  <section className="admin-login-pane">
                    <div className="admin-toolbar admin-login-toolbar">
                      <h2>{adminText.loginTitle}</h2>
                      <a className="secondary-btn" href="/">
                        {adminText.backToWebsite}
                      </a>
                    </div>

                    <form className="admin-login admin-login-form" onSubmit={handleAdminLogin}>
                      <label>
                        {adminText.email}
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(event) => setAdminEmail(event.target.value)}
                          disabled={adminLoggingIn || adminGoogleLoggingIn}
                          required
                        />
                      </label>
                      <label>
                        {adminText.password}
                        <div className="admin-password-field">
                          <input
                            type={showAdminPassword ? 'text' : 'password'}
                            value={adminPassword}
                            onChange={(event) => setAdminPassword(event.target.value)}
                            disabled={adminLoggingIn || adminGoogleLoggingIn}
                            required
                          />
                          <button
                            className="admin-password-toggle"
                            type="button"
                            onClick={() => setShowAdminPassword((prev) => !prev)}
                            disabled={adminLoggingIn || adminGoogleLoggingIn}
                            aria-label={
                              showAdminPassword ? adminText.hidePasswordAria : adminText.showPasswordAria
                            }
                          >
                            {showAdminPassword ? adminText.hidePassword : adminText.showPassword}
                          </button>
                        </div>
                      </label>
                      <button
                        className={`primary-btn ${adminLoggingIn ? 'is-loading' : ''}`}
                        type="submit"
                        disabled={adminLoggingIn || adminGoogleLoggingIn}
                      >
                        {adminLoggingIn && <span className="btn-spinner" aria-hidden="true" />}
                        {adminLoggingIn ? adminText.loggingIn : adminText.loginAsAdmin}
                      </button>

                      <div className="admin-login-divider">
                        <span>{adminText.orContinueWith}</span>
                      </div>

                      <button
                        className={`secondary-btn admin-google-btn ${adminGoogleLoggingIn ? 'is-loading' : ''}`}
                        type="button"
                        onClick={handleAdminGoogleLogin}
                        disabled={adminLoggingIn || adminGoogleLoggingIn}
                      >
                        {adminGoogleLoggingIn && <span className="btn-spinner dark" aria-hidden="true" />}
                        {adminGoogleLoggingIn ? adminText.redirectingToGoogle : adminText.loginWithGoogle}
                      </button>
                    </form>
                  </section>
                </div>
              ) : (
                <div className="admin-dashboard admin-layout-clean">
                  <div className="admin-workspace">
                    <aside className="admin-sidebar-menu" aria-label={t.ariaAdminSidebar}>
                      <div className="admin-side-head">
                        <h3>{adminText.panelTitle}</h3>
                      </div>

                      {[
                        { id: 'overview', label: adminText.overview },
                        { id: 'site', label: adminText.siteContent },
                        { id: 'topics', label: adminText.topics },
                        { id: 'categories', label: adminText.categories },
                        { id: 'questions', label: adminText.questions },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          className={`admin-side-btn ${adminTab === tab.id ? 'active' : ''}`}
                          onClick={() => setAdminTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}

                      <div className="admin-side-actions">
                        <a className="secondary-btn" href="/">
                          {adminText.backToWebsite}
                        </a>
                        <button className="secondary-btn" type="button" onClick={handleAdminLogout}>
                          {adminText.logout}
                        </button>
                      </div>
                    </aside>

                    <div className="admin-content-pane">
                    <div className="admin-topbar">
                      <h2>{adminText.managerTitle}</h2>
                    </div>

                    <div className="admin-promo-bar">
                      <p>{adminText.promoText}</p>
                      <div className="inline-actions">
                        <button className="secondary-btn" type="button" onClick={() => setAdminTab('site')}>
                          {adminText.openSiteContent}
                        </button>
                      </div>
                    </div>

                    {adminTab === 'overview' && (
                      <section className="admin-card admin-overview admin-overview-board">
                        <h3>{adminText.dashboardOverview}</h3>
                        <p>{adminText.dashboardOverviewDesc}</p>

                        <div className="admin-metrics">
                          <article className="admin-metric-card metric-a">
                            <span>{adminText.topics}</span>
                            <strong>{topics.length}</strong>
                            <small>{adminText.availableQuizThemes}</small>
                          </article>
                          <article className="admin-metric-card metric-b">
                            <span>{adminText.categories}</span>
                            <strong>{categories.length}</strong>
                            <small>{adminText.questionGroupingStatus}</small>
                          </article>
                          <article className="admin-metric-card metric-c">
                            <span>{adminText.questions}</span>
                            <strong>{adminQuestions.length}</strong>
                            <small>{adminText.totalChallengePool}</small>
                          </article>
                        </div>

                        <div className="admin-chart-grid">
                          <article className="admin-chart-card">
                            <h4>{adminText.contentDataActivity}</h4>
                            <div className="bar-chart-placeholder" aria-hidden="true">
                              {[32, 58, 41, 67, 52, 76, 62].map((height, index) => (
                                <span key={`bar-${index}`} style={{ height: `${height}%` }} />
                              ))}
                            </div>
                          </article>
                          <article className="admin-chart-card">
                            <h4>{adminText.trafficSources}</h4>
                            <div className="donut-chart-placeholder" aria-hidden="true" />
                            <p className="admin-chart-legend">{adminText.trafficLegend}</p>
                          </article>
                        </div>

                        <ul>
                          <li>{adminText.siteTask1}</li>
                          <li>{adminText.siteTask2}</li>
                          <li>{adminText.siteTask3}</li>
                          <li>{adminText.siteTask4}</li>
                        </ul>
                      </section>
                    )}

                    {adminTab === 'site' && (
                      <section className="admin-card">
                        <h3>{adminText.manageHomeFooter}</h3>
                        <form className="admin-form" onSubmit={handleSiteContentSubmit}>
                          <label className="admin-inline-field" htmlFor="site-main-color">
                            {adminText.mainColor}
                            <input
                              id="site-main-color"
                              type="color"
                              value={normalizeHexColor(siteContentForm.mainColor) ?? defaultSiteContent.mainColor}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, mainColor: event.target.value }))
                              }
                            />
                          </label>

                          <label className="admin-inline-field" htmlFor="site-hero-title">
                            {adminText.heroTitle}
                            <input
                              id="site-hero-title"
                              type="text"
                              value={siteContentForm.heroTitle}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, heroTitle: event.target.value }))
                              }
                            />
                          </label>

                          <label className="admin-inline-field" htmlFor="site-hero-text">
                            {adminText.heroText}
                            <textarea
                              id="site-hero-text"
                              value={siteContentForm.heroText}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, heroText: event.target.value }))
                              }
                              rows={3}
                            />
                          </label>

                          <label className="admin-inline-field" htmlFor="site-hero-image">
                            {adminText.heroImageUrl}
                            <input
                              id="site-hero-image"
                              type="url"
                              value={siteContentForm.heroImage}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, heroImage: event.target.value }))
                              }
                            />
                          </label>
                          <label className="admin-inline-field" htmlFor="site-hero-image-file">
                            {adminText.chooseLocalHeroImage}
                            <input
                              id="site-hero-image-file"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) => uploadSiteImage(event, 'heroImage')}
                              disabled={siteHeroImageUploading}
                            />
                          </label>
                          {siteHeroImageUploading && <small>{adminText.uploadingHeroImage}</small>}
                          {siteContentForm.heroImage && (
                            <div
                              className="admin-image-preview"
                              style={{ backgroundImage: `url(${siteContentForm.heroImage})` }}
                              aria-hidden="true"
                            />
                          )}

                          <label className="admin-inline-field" htmlFor="site-banner1-image">
                            {adminText.banner1ImageUrl}
                            <input
                              id="site-banner1-image"
                              type="url"
                              value={siteContentForm.banner1Image ?? ''}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, banner1Image: event.target.value }))
                              }
                            />
                          </label>
                          <label className="admin-inline-field" htmlFor="site-banner1-image-file">
                            {adminText.chooseLocalBanner1Image}
                            <input
                              id="site-banner1-image-file"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) => uploadSiteImage(event, 'banner1Image')}
                              disabled={siteBanner1ImageUploading}
                            />
                          </label>
                          {siteBanner1ImageUploading && <small>{adminText.uploadingBanner1Image}</small>}
                          {siteContentForm.banner1Image && (
                            <div
                              className="admin-image-preview"
                              style={{ backgroundImage: `url(${siteContentForm.banner1Image})` }}
                              aria-hidden="true"
                            />
                          )}

                          <label className="admin-inline-field" htmlFor="site-banner2-image">
                            {adminText.banner2ImageUrl}
                            <input
                              id="site-banner2-image"
                              type="url"
                              value={siteContentForm.banner2Image ?? ''}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, banner2Image: event.target.value }))
                              }
                            />
                          </label>
                          <label className="admin-inline-field" htmlFor="site-banner2-image-file">
                            {adminText.chooseLocalBanner2Image}
                            <input
                              id="site-banner2-image-file"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) => uploadSiteImage(event, 'banner2Image')}
                              disabled={siteBanner2ImageUploading}
                            />
                          </label>
                          {siteBanner2ImageUploading && <small>{adminText.uploadingBanner2Image}</small>}
                          {siteContentForm.banner2Image && (
                            <div
                              className="admin-image-preview"
                              style={{ backgroundImage: `url(${siteContentForm.banner2Image})` }}
                              aria-hidden="true"
                            />
                          )}

                          <label className="admin-inline-field" htmlFor="site-banner1-text">
                            {adminText.banner1Text}
                            <input
                              id="site-banner1-text"
                              type="text"
                              value={siteContentForm.banner1Text}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, banner1Text: event.target.value }))
                              }
                            />
                          </label>

                          <label className="admin-inline-field" htmlFor="site-banner2-text">
                            {adminText.banner2Text}
                            <input
                              id="site-banner2-text"
                              type="text"
                              value={siteContentForm.banner2Text}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, banner2Text: event.target.value }))
                              }
                            />
                          </label>

                          <div className="site-editor-grid">
                            <label className="admin-inline-field" htmlFor="site-card1-title">
                              {adminText.card1Title}
                              <input
                                id="site-card1-title"
                                type="text"
                                value={siteContentForm.valueCard1Title}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard1Title: event.target.value,
                                  }))
                                }
                              />
                            </label>
                            <label className="admin-inline-field" htmlFor="site-card1-text">
                              {adminText.card1Text}
                              <input
                                id="site-card1-text"
                                type="text"
                                value={siteContentForm.valueCard1Text}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard1Text: event.target.value,
                                  }))
                                }
                              />
                            </label>
                            <label className="admin-inline-field" htmlFor="site-card2-title">
                              {adminText.card2Title}
                              <input
                                id="site-card2-title"
                                type="text"
                                value={siteContentForm.valueCard2Title}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard2Title: event.target.value,
                                  }))
                                }
                              />
                            </label>
                            <label className="admin-inline-field" htmlFor="site-card2-text">
                              {adminText.card2Text}
                              <input
                                id="site-card2-text"
                                type="text"
                                value={siteContentForm.valueCard2Text}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard2Text: event.target.value,
                                  }))
                                }
                              />
                            </label>
                            <label className="admin-inline-field" htmlFor="site-card3-title">
                              {adminText.card3Title}
                              <input
                                id="site-card3-title"
                                type="text"
                                value={siteContentForm.valueCard3Title}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard3Title: event.target.value,
                                  }))
                                }
                              />
                            </label>
                            <label className="admin-inline-field" htmlFor="site-card3-text">
                              {adminText.card3Text}
                              <input
                                id="site-card3-text"
                                type="text"
                                value={siteContentForm.valueCard3Text}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({
                                    ...prev,
                                    valueCard3Text: event.target.value,
                                  }))
                                }
                              />
                            </label>
                          </div>

                          <label className="admin-inline-field" htmlFor="site-footer-brand">
                            {adminText.footerBrand}
                            <input
                              id="site-footer-brand"
                              type="text"
                              value={siteContentForm.footerBrand}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, footerBrand: event.target.value }))
                              }
                            />
                          </label>

                          <label className="admin-inline-field" htmlFor="site-footer-description">
                            {adminText.footerDescription}
                            <input
                              id="site-footer-description"
                              type="text"
                              value={siteContentForm.footerDescription}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, footerDescription: event.target.value }))
                              }
                            />
                          </label>

                          <div className="site-editor-grid">
                            <label className="admin-inline-field" htmlFor="site-footer-email">
                              {adminText.footerEmail}
                              <input
                                id="site-footer-email"
                                type="text"
                                value={siteContentForm.footerEmail}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({ ...prev, footerEmail: event.target.value }))
                                }
                              />
                            </label>

                            <label className="admin-inline-field" htmlFor="site-footer-location">
                              {adminText.footerLocation}
                              <input
                                id="site-footer-location"
                                type="text"
                                value={siteContentForm.footerLocation}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({ ...prev, footerLocation: event.target.value }))
                                }
                              />
                            </label>

                            <label className="admin-inline-field" htmlFor="site-github-link">
                              {adminText.githubUrl}
                              <input
                                id="site-github-link"
                                type="url"
                                value={siteContentForm.socialGithub}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({ ...prev, socialGithub: event.target.value }))
                                }
                              />
                            </label>

                            <label className="admin-inline-field" htmlFor="site-linkedin-link">
                              {adminText.linkedInUrl}
                              <input
                                id="site-linkedin-link"
                                type="url"
                                value={siteContentForm.socialLinkedIn}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({ ...prev, socialLinkedIn: event.target.value }))
                                }
                              />
                            </label>

                            <label className="admin-inline-field" htmlFor="site-facebook-link">
                              {adminText.facebookUrl}
                              <input
                                id="site-facebook-link"
                                type="url"
                                value={siteContentForm.socialFacebook}
                                onChange={(event) =>
                                  setSiteContentForm((prev) => ({ ...prev, socialFacebook: event.target.value }))
                                }
                              />
                            </label>
                          </div>

                          <label className="admin-inline-field" htmlFor="site-footer-copy">
                            {adminText.footerCopyrightText}
                            <input
                              id="site-footer-copy"
                              type="text"
                              value={siteContentForm.footerCopy}
                              onChange={(event) =>
                                setSiteContentForm((prev) => ({ ...prev, footerCopy: event.target.value }))
                              }
                            />
                          </label>

                          <div className="inline-actions">
                            <button className="primary-btn" type="submit">
                              {adminText.saveSiteContent}
                            </button>
                            <button className="secondary-btn" type="button" onClick={resetSiteContent}>
                              {adminText.resetDefault}
                            </button>
                          </div>
                        </form>
                      </section>
                    )}

                    {adminTab === 'topics' && (
                      <section className="admin-card">
                        <h3>{editingTopicId ? adminText.editTopic : adminText.createTopic}</h3>
                        <form onSubmit={submitTopic} className="admin-form">
                          <input
                            type="text"
                            placeholder={adminText.topicName}
                            value={topicForm.name}
                            onChange={(event) =>
                              setTopicForm((prev) => ({ ...prev, name: event.target.value }))
                            }
                            required
                          />
                          <input
                            type="url"
                            placeholder={adminText.topicImageUrl}
                            value={topicForm.image_url}
                            onChange={(event) =>
                              setTopicForm((prev) => ({ ...prev, image_url: event.target.value }))
                            }
                          />
                          <label className="admin-inline-field" htmlFor="topic-image-file">
                            {adminText.chooseImageFile}
                            <input
                              id="topic-image-file"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={uploadTopicImage}
                              disabled={topicImageUploading}
                            />
                          </label>
                          {topicImageUploading && <small>{adminText.uploadingImage}</small>}
                          {topicForm.image_url && (
                            <div
                              className="admin-image-preview"
                              style={{ backgroundImage: `url(${topicForm.image_url})` }}
                              aria-hidden="true"
                            />
                          )}

                          <div className="inline-actions">
                            <button className="primary-btn" type="submit">
                              {editingTopicId ? adminText.updateTopic : adminText.addTopic}
                            </button>
                            {editingTopicId && (
                              <button
                                className="secondary-btn"
                                type="button"
                                onClick={() => {
                                  setEditingTopicId(null);
                                  setTopicForm(emptyTopicForm);
                                }}
                              >
                                {adminText.cancel}
                              </button>
                            )}
                          </div>
                        </form>

                        <div className="admin-list">
                          {topics.map((topic) => (
                            <div key={topic.id} className="list-row">
                              <div>
                                <strong>{topic.name}</strong>
                                <small>
                                  {topic.questions_count} {adminText.questionsCount}
                                </small>
                              </div>
                              <div className="inline-actions">
                                <button className="secondary-btn" onClick={() => editTopic(topic)}>
                                  {adminText.edit}
                                </button>
                                <button className="danger-btn" onClick={() => deleteTopic(topic.id)}>
                                  {adminText.delete}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {adminTab === 'categories' && (
                      <section className="admin-card">
                      <h3>{editingCategoryId ? adminText.editCategory : adminText.createCategory}</h3>
                      <form onSubmit={submitCategory} className="admin-form">
                        <input
                          type="text"
                          placeholder={adminText.categoryName}
                          value={categoryForm.name}
                          onChange={(event) =>
                            setCategoryForm((prev) => ({ ...prev, name: event.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder={adminText.description}
                          value={categoryForm.description}
                          onChange={(event) =>
                            setCategoryForm((prev) => ({ ...prev, description: event.target.value }))
                          }
                        />
                        <div className="inline-actions">
                          <button className="primary-btn" type="submit">
                            {editingCategoryId ? adminText.updateCategory : adminText.addCategory}
                          </button>
                          {editingCategoryId && (
                            <button
                              className="secondary-btn"
                              type="button"
                              onClick={() => {
                                setEditingCategoryId(null);
                                setCategoryForm(emptyCategoryForm);
                              }}
                            >
                              {adminText.cancel}
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="admin-list">
                        {categories.map((category) => (
                          <div key={category.id} className="list-row">
                            <div>
                              <strong>{category.name}</strong>
                              <p>{category.description || adminText.noDescription}</p>
                              <small>
                                {category.questions_count} {adminText.questionsCount}
                              </small>
                            </div>
                            <div className="inline-actions">
                              <button className="secondary-btn" onClick={() => editCategory(category)}>
                                {adminText.edit}
                              </button>
                              <button
                                className="danger-btn"
                                onClick={() => deleteCategory(category.id)}
                              >
                                {adminText.delete}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    )}

                    {adminTab === 'questions' && (
                    <section className="admin-card">
                      <h3>{editingQuestionId ? adminText.editQuestion : adminText.createQuestion}</h3>
                      <form onSubmit={submitQuestion} className="admin-form">
                        <input
                          type="text"
                          placeholder={adminText.questionText}
                          value={questionForm.text}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, text: event.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder={adminText.topic}
                          value={questionForm.topic}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, topic: event.target.value }))
                          }
                        />
                        <label className="admin-inline-field" htmlFor="existing-topic-select">
                          {adminText.selectExistingTopic}
                          <select
                            id="existing-topic-select"
                            value={questionForm.topic_id}
                            onChange={(event) => {
                              const topicId = event.target.value;
                              const selectedTopic = topics.find((topic) => String(topic.id) === topicId);

                              setQuestionForm((prev) => ({
                                ...prev,
                                topic_id: topicId,
                                topic: selectedTopic ? selectedTopic.name : prev.topic,
                                topic_image_url: selectedTopic ? selectedTopic.image_url ?? '' : prev.topic_image_url,
                              }));
                            }}
                          >
                            <option value="">{adminText.noLinkedTopic}</option>
                            {topics.map((topic) => (
                              <option key={topic.id} value={topic.id}>
                                {topic.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <input
                          type="url"
                          placeholder={adminText.topicImageUrl}
                          value={questionForm.topic_image_url}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, topic_image_url: event.target.value }))
                          }
                        />
                        <label className="admin-inline-field" htmlFor="question-image-file">
                          {adminText.chooseLocalTopicImage}
                          <input
                            id="question-image-file"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={uploadQuestionImage}
                            disabled={questionImageUploading}
                          />
                        </label>
                        {questionImageUploading && <small>{adminText.uploadingQuestionImage}</small>}
                        <label className="admin-inline-field" htmlFor="topic-image-preset">
                          {adminText.chooseImageOption}
                          <select
                            id="topic-image-preset"
                            value={
                              topicImagePresetOptions.some(
                                (option) => option.url === questionForm.topic_image_url,
                              )
                                ? questionForm.topic_image_url
                                : ''
                            }
                            onChange={(event) =>
                              setQuestionForm((prev) => ({
                                ...prev,
                                topic_image_url: event.target.value,
                              }))
                            }
                          >
                            <option value="">{adminText.chooseFromPresetList}</option>
                            {topicImagePresetOptions.map((option) => (
                              <option key={`${option.label}-${option.url}`} value={option.url}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        {questionForm.topic_image_url && (
                          <div
                            className="admin-image-preview"
                            style={{ backgroundImage: `url(${questionForm.topic_image_url})` }}
                            aria-hidden="true"
                          />
                        )}
                        {questionForm.topic_image_url && (
                          <button
                            className="secondary-btn"
                            type="button"
                            onClick={() =>
                              setQuestionForm((prev) => ({ ...prev, topic_image_url: '' }))
                            }
                          >
                            {adminText.clearImage}
                          </button>
                        )}
                        <select
                          value={questionForm.category_id}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, category_id: event.target.value }))
                          }
                        >
                          <option value="">{adminText.noCategory}</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder={adminText.optionA}
                          value={questionForm.option_a}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, option_a: event.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder={adminText.optionB}
                          value={questionForm.option_b}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, option_b: event.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder={adminText.optionC}
                          value={questionForm.option_c}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, option_c: event.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder={adminText.optionD}
                          value={questionForm.option_d}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, option_d: event.target.value }))
                          }
                          required
                        />
                        <select
                          value={questionForm.correct_answer}
                          onChange={(event) =>
                            setQuestionForm((prev) => ({ ...prev, correct_answer: event.target.value }))
                          }
                        >
                          <option value="a">{adminText.correctA}</option>
                          <option value="b">{adminText.correctB}</option>
                          <option value="c">{adminText.correctC}</option>
                          <option value="d">{adminText.correctD}</option>
                        </select>

                        <div className="inline-actions">
                          <button className="primary-btn" type="submit">
                            {editingQuestionId ? adminText.updateQuestion : adminText.addQuestion}
                          </button>
                          {editingQuestionId && (
                            <button
                              className="secondary-btn"
                              type="button"
                              onClick={() => {
                                setEditingQuestionId(null);
                                setQuestionForm(emptyQuestionForm);
                              }}
                            >
                              {adminText.cancel}
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="admin-list">
                        {adminQuestions.map((question) => (
                          <div key={question.id} className="list-row">
                            <div>
                              <strong>{question.text}</strong>
                              <p>
                                {question.topic || adminText.general} | {question.category?.name || adminText.noCategory}
                              </p>
                              {question.topic_id && <small>{adminText.linkedToTopic} #{question.topic_id}</small>}
                              {question.topic_image_url && <small>{adminText.topicImageConfigured}</small>}
                              <small>{adminText.correctAnswer}: {question.correct_answer.toUpperCase()}</small>
                            </div>
                            <div className="inline-actions">
                              <button className="secondary-btn" onClick={() => editQuestion(question)}>
                                {adminText.edit}
                              </button>
                              <button
                                className="danger-btn"
                                onClick={() => deleteQuestion(question.id)}
                              >
                                {adminText.delete}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    )}
                    </div>
                  </div>
                </div>
              )}

              {adminError && <p className="error-text">{adminError}</p>}
              {adminNotice && <p className="success-text">{adminNotice}</p>}
            </div>
          )}

          {activeView === 'About Authorizer' && (
            <div className="portfolio-page">
              <p className="page-badge">{t.aboutPageBadge}</p>
              <h2>{t.aboutTitle}</h2>
              <p>{t.aboutDesc}</p>
              <ul>
                <li><strong>{t.aboutTechnicalStackLabel}:</strong> {t.aboutTechnicalStackValue}</li>
                <li><strong>{t.aboutComputerLabel}:</strong> {t.aboutComputerValue}</li>
                <li><strong>{t.aboutMicrosoftLabel}:</strong> {t.aboutMicrosoftValue}</li>
                <li><strong>{t.aboutDatabaseLabel}:</strong> {t.aboutDatabaseValue}</li>
                <li><strong>{t.aboutProgrammingLabel}:</strong> {t.aboutProgrammingValue}</li>
                <li><strong>{t.aboutSoftSkillsLabel}:</strong> {t.aboutSoftSkillsValue}</li>
              </ul>
            </div>
          )}
        </section>
      </div>

      <footer className="site-footer">
        <div className="footer-simple">
          <div className="footer-info">
            <h4>{siteContent.footerBrand || t.footerBrand}</h4>
            <p>{siteContent.footerDescription || t.footerBrandDesc}</p>
            <p>
              {t.footerContact}: {siteContent.footerEmail || t.footerEmail} | {siteContent.footerLocation || t.footerLocation}
            </p>
          </div>

          <div className="footer-social" role="navigation" aria-label={t.ariaSocialLinks}>
            <span>{t.footerFollow}</span>
            <a className="footer-social-link" href={siteContent.socialGithub || 'https://github.com'} target="_blank" rel="noreferrer">
              <span className="social-icon" aria-hidden="true">🐙</span>
              {t.footerSocialGithub}
            </a>
            <a className="footer-social-link" href={siteContent.socialLinkedIn || 'https://linkedin.com'} target="_blank" rel="noreferrer">
              <span className="social-icon" aria-hidden="true">💼</span>
              {t.footerSocialLinkedIn}
            </a>
            <a className="footer-social-link" href={siteContent.socialFacebook || 'https://facebook.com'} target="_blank" rel="noreferrer">
              <span className="social-icon" aria-hidden="true">📘</span>
              {t.footerSocialFacebook}
            </a>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Rom Chamraeun. {siteContent.footerCopy || t.footerCopy}
        </p>
      </footer>
    </main>
  );
}

export default App;