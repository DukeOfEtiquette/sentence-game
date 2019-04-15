'use strict';

let words = ['sat','bat','the','he','she','a','is','red','fall','on','hit','at','if','what','blue','out','and','you','run','me','was','want','sun','play','it','down','one','orange','purple','her','girl','boy','green','ball','ellie','can','tall','big','up','said','dog','cat'];
const wordBoxClassName = 'box';
const wordBoxHTML = `<span class="${wordBoxClassName}"></span>`;

const resetId = 'reset';
const dictionaryId = 'dictionary';
const sentenceId = 'sentence';

// eslint-disable-next-line no-undef
$(document).ready(initPage);

function initPage(){
  getWordsFromLocalStorage();
  renderBoxes(dictionaryId);
  addAllListeners();
}

function renderBoxes(parentElementId){
  words.forEach(word => renderBox(word, parentElementId));
}

function renderBox(word, parentElementId){
  $(wordBoxHTML)
    .text(word)
    .attr('id', word)
    .appendTo(`#${parentElementId}`);
}

function isWordBox(target){
  return target.className.includes(wordBoxClassName) ? true : false;
}

/********************************************************************************
 * LOCAL STORAGE
********************************************************************************/ 
function saveWordsToLocalStorage(){
  localStorage.setItem('words', words.toString());
}

function getWordsFromLocalStorage(){
  if(!localStorage['words']) {
    saveWordsToLocalStorage();
    return;
  }

  words = localStorage.getItem('words').split(',');
}

/********************************************************************************
 * EVENT LISTENSERS
********************************************************************************/ 
function resetSentence(){
  $(`#${sentenceId}`).empty();
}

function onClickAddToSentence(e){
  e.preventDefault();
  if(!isWordBox(e.target)) return;

  $(e.target)
    .clone()
    .attr('id', '')
    .addClass('selected')
    .appendTo(`#${sentenceId}`);
}

function onClickRemoveFromSentence(e){
  e.preventDefault();
  if(!isWordBox(e.target)) return;

  $(e.target).remove();
}

function addAllListeners(){
  $(`#${resetId}`).click(resetSentence);
  $(`#${dictionaryId}`).click(onClickAddToSentence);
  $(`#${sentenceId}`).click(onClickRemoveFromSentence);
}