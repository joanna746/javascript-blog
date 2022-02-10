'use strict';

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


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author';

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

function generateTags() {
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
    }
    /* END LOOP: for each tag */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);


    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

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
  const allTagLinks = document.querySelectorAll('a[href^=" tag-' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks) {
    /* add class active */
    linkTags.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for (let allTagLink of allTagLinks) {
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

}
addClickListenersToTags();


function generateAuthors() {
  const authorsList = document.querySelector('.authors.list');
  /*remove class list*/
  authorsList.classList.remove('active');
  console.log(authorsList);
  let html = '';
  /*find all articles*/
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /*for every artice*/
  for (let article of articles) {
    /*find Authors*/
    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log(authorsWrapper);
    let html = '';
    /*get author from data-author*/
    const articleAuthors = article.getAttribute('data-author');
    console.log('data-author:', articleAuthors);
    for (let article of articles) {
      /*generate HTML of the link*/
      const authorHTML = '<ul> class="list authors">' + articleAuthors + '</ul>';
      console.log(authorHTML);
    }
    /*add generated code to html*/
  }

}


generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^=#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let allAuthorLink of allAuthorLinks) {
    allAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();