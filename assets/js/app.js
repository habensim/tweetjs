//LOCALSTORAGE
//variables
tweetList = document.getElementById('tweet-list');

eventListeners()
//Event Listener
function eventListeners() {
    //form submission
    document.querySelector('#form').addEventListener('submit', newTweet);
    //remove tweet for the list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Functions
function newTweet(e) {
    e.preventDefault();
    //Read the Textarea value
    const tweet = document.getElementById('tweet').value;
    //create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    //create an li element
    const li = document.createElement('li');
    li.textContent = tweet;
    // Add remove button to each tweet
    li.appendChild(removeBtn);
    tweetList.appendChild(li);

    // add to localstorage
    addTweetLocalStorage(tweet);

    //print the alert
    alert('Tweet Added');
    this.reset();
}

// function remove tweet from the dom
function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    } 
    //console.log(e.target.parentElement.textContent);
    //Remove from storage
    removeTweetLocalStorage( e.target.parentElement.textContent );
    alert('Are you sure to delete');
}

// function add into to the localstorage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetFromStorage();

    // add tweet into the array
    tweets.push(tweet);

    // Convert tweet array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    //get the values, if null is returned then we create an empty array
    if (tweetsLS == null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

//Prints local storage Tweet on load
function localStorageOnLoad() {
    let tweets = getTweetFromStorage();

    //Loop throught storage and then print the values
    tweets.forEach(function (tweet) {
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';
        //create an li element
        const li = document.createElement('li');
        li.textContent = tweet;
        // Add remove button to each tweet
        li.appendChild(removeBtn);
        tweetList.appendChild(li);
    });
}

// Remove the tweet from localstorage
function removeTweetLocalStorage(tweet){
    //get tweet from storage
    let tweets = getTweetFromStorage();
    //console.log(tweets);
    //remove the X from the tweet
    const tweetDelete = tweet.substring( 0, tweet.length -1);

    //Loop throught the tweet and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            //array.splice(index, howmany, item1, ....., itemX)
            tweets.splice(index,1)
        }
    });

    //save the data
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}