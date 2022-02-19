'use strict';

//KLASY

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /*[DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);


  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(href);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

//TITLE LINKS

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optAuthorListSelector = '.list.authors',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

//TAGS
const calculateTagsParams = function (tags) {
  const params = { max: 0, min: 999999, };

  for (let tag in tags) {
    console.log(tag + 'is used ' + tags[tag] + ' times ');
    params.min = Math.min(tags[tag], params.min);
    params.max = Math.max(tags[tag], params.max);
  }
  return params;

}


function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('data-tags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);


    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '(' + (allTags[tag]) + ')' + '</a></li>';
      console.log(allTagsHTML)



    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log(allTags);
  }
}

generateTags();

//TAG CLICK HANDLER

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let allTagLinks = document.querySelectorAll('a[href^=" tag-' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks) {
    /* add class active */
    allTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  let links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

}
addClickListenersToTags();



//GENERATE AUTHORS//

const generateAuthors = function () {


  const allAuthors = [];

  /* find article all articles*/
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* find autor wrapper*/
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log(authorWrapper);
    /* make html variable with empty string */
    let html = '';
    /*get attribute data-author*/
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    const authorHTML = '<a href="#author-' + articleAuthor + '"> ' + articleAuthor + '</a>';
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log(allAuthors);

    html = html + authorHTML;


    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
  }
  const authorWrapper = document.querySelector(optAuthorListSelector);
  console.log(authorWrapper);

  /* Create empty HTML variable for all links */
  let authorsListHTML = '';

  /* Start LOOP for every author in allAuthors */
  for (let articleAuthor in allAuthors) {


    /* Generate HTML code for every author and add it into html code */
    authorsListHTML += '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>';
    console.log(authorsListHTML);
  }

  authorWrapper.innerHTML = authorsListHTML;
};

generateAuthors();

//AUTHOR CLICK HANDLER

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const authorHref = clickedElement.getAttribute('href');
  console.log(authorHref);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = authorHref.replace('#author-', '');

  /* find all authors links with class active */
  let authorLinks = document.querySelectorAll('a.active[data-author =""]');
  for (let authorLink of authorLinks) {

    /* remove class active */
    authorLink.classList.remove('active');
  }

  /* find all authors links with "href" attribute equal to the "href" constant */
  const articlesAuthorList = document.querySelectorAll('a[data-author="' + author + '"');
  for (let articleAuthor of articlesAuthorList) {
    /* add class active */
    articleAuthor.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
};
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
};
addClickListenersToAuthors();
