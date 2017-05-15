'use strict';

//Globals used to create pagination
var studentItems = $('.student-item');
var pagination = "<div class='pagination'><ul></ul></div>";
var studentList = pages(studentItems);

////////////////////////////////////////////////////////
//Search bar
////////////////////////////////////////////////////////
var studentSearch = '<div class="student-search"><input id="searchName" placeholder="Search students"><button id="submit">Search</button></div>';
$('.page-header.cf').append(studentSearch);
function search() {
	//validating the search in case extra white spaces and making the end result all lower case with toLowerCase
	var searchItem = $('#searchName').val().toLowerCase().trim();

//filtering through the students to find either their name or the email that they have listed
	var filterStudents = studentItems.filter(function(i) {
		//finds the item that is related to the email or their name
		var email = $(this).find('.email').text();
		var name = $(this).find('h3').text();

		//testing to see if the typed in search matches any of the students
		if(name.indexOf(searchItem) > - 1 || email.indexOf(searchItem) > - 1) {
			return true;
		} else {
			return false;
		}
	});

	if(filterStudents.length === 0) {
		$('.page-header h2').text("Sorry there are no results");
	} else {
		$('.page-header h2').text("Students searched");
	}
	var students = pages(filterStudents);
	$('.pagination').remove();
	if(filterStudents.length >= 10) {
		appendBtns(students);
	}
	showPages(0, students);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//Pagination
////////////////////////////////////////////////////

//Generate an array of students that limits 10 people per page
function pages(list) {
	//slice is used to cut off the items from the old student list
	var oldList = list.slice();
	var pagesArray = [];
	while(oldList.length) {
		pagesArray.push(oldList.splice(0, 10));
	} 
	//pagesArray is created and then push is used to add the spliced amount of items to the end of the pagesArray
	return pagesArray;
}




//Display the first page while hiding the rest
function showPages(pageNumber, pageList) {
	$(".student-list li").hide();
	//.each determines the page the person is trying to select
	$.each(pageList, function(index, page) {
		//if the pageNumber is equal to the index it will display the correct page
		if(pageNumber === index) {
			$.each(page, function(i, listItem) {
				//The page will fade in fast
				$(listItem).fadeIn('fast');
			});
		}
	});
}

//Append buttons to page create the structure for the pagination system
function appendBtns(pageList) {
	//appends the structure for the pagination
	$('.page').append(pagination);
	var numPages = pageList.length;
	//for loop is used to loop through the amount of students and then i is used to show the amount of pages based on the results of the for loop
	for(var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		//after calculations to determine the amount of buttons needed they are appended to the page
		$('.pagination ul').append(buttons);
	}
	//adds the active class to the current page when the browser loads
	$('.pagination ul li a').first().addClass('active');

	//Add event listeners using the click event creates an active class for the current page,
	//and then removing the active class from that page and adding active class to the selected page
	$('.pagination ul li a').on("click", function(event) {
		//creates the selected page into an integer
		var pageSelection = parseInt($(this)[0].text) - 1;
		//displays the page based on the previous result
		showPages(pageSelection, pageList);
		//removes the class when switched to another page and then adds the active class to the selected page
		$('.pagination ul li a').removeClass();
		$(this).addClass("active");
		//prevents the default actions created by the browser
		event.preventDefault();
	});
}




//calling the function appendBtns which provides the correct amount of buttons for the amount of items that are in the studentList
appendBtns(studentList);
//calling the showPages function starting at the zero index and then displays the next 10 results from the studentList
showPages(0, studentList);
//calls the search function when the button is clicked
$('.student-search').find('button').on('click', search);
$('.student-search').find('input').keyup(search);
