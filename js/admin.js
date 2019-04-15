'use strict';

let words = [];
const wordBoxClassName = 'box';
const wordBoxHTML = `<span class="${wordBoxClassName}"></span>`;

const dictionaryId = 'dictionary';

$(document).ready(initPage);

function initPage(){
  getWordsFromLocalStorage();
  renderBoxes(dictionaryId);

  $('#addWordForm').submit(handleAddWord);
  $('#removeWordForm').submit(handleRemoveWord);
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

function handleAddWord(e){
  e.preventDefault();
  const newWord = e.target.word.value;
  if(words.includes(newWord)){
    flash('failure', '#addWordForm fieldset');
  }else{
    words.push(newWord);
    saveWordsToLocalStorage();
    flash('success', '#addWordForm fieldset');
    renderBox(newWord, 'dictionary');
  }

  e.target.reset();
}

function handleRemoveWord(e){
  e.preventDefault();
  const index = words.indexOf(e.target.word.value);

  if(index !== -1){
    words.splice(index, 1);
    saveWordsToLocalStorage();
    flash('success', '#removeWordForm fieldset');
    $(`#${e.target.word.value}`).remove();
  }else{
    flash('failure', '#removeWordForm fieldset');
  }

  e.target.reset();
}

function flash(className, selector){
  $(selector).addClass(className);
  setTimeout(function(){
    $(selector).removeClass(className);
  }, 2225);
}

/********************************************************************************
 * LOCAL STORAGE
********************************************************************************/ 
function saveWordsToLocalStorage(){
  localStorage.setItem('words', words.toString());
}

function getWordsFromLocalStorage(){
  if(!localStorage['words']) return;

  words = localStorage.getItem('words').split(',');
}

