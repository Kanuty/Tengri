"# Tengri"
Author: Bartosz Dudek

External dependencies:
-- none
This project use vanilla JS and CSS only.

What should have been implemented better:
Async:
Data aren't fetch asynchronously. User can't do a thing while data are fetched. This is the second most important thing to refactor.

BubbleSort:
BubbleSort is one of the least efficient way of sorting. There is firmly recomended to refactor this mechanism.

Modularity:
Fragments of code are not modular. There is almost 0 proper architecture. View and logic are not separated. There is a need for a more experienced developer that would help to design internal architecture of aplication. This is the most important thing to do, because any new funcionality will suffer from spagetthi like architecture.

Pagination problem:
Pagination is hard coded. There is always equal number of buttons, no matter how much data have been fetch. Every button shows exactly 50 rows. It mean that any changes in numbers of visible rows will require changes in logic.Futhermore, "show only few buttons" mechanism is not implemented. If there would be 15 buttons, all would be displayed. There should be an option to show last used button + 2 buttons with lesser or higher number. Moreover, There aren't any "first" and "last" button that would shows first or last 50 rows. User don't know which page is currently displayed.

After sorting mechanism has been used, view is reseted to page 1. User have no clear indicator about that.

Last month income question:
There is no information what "last month" mean. Is this a last month from today? Or is it last month of the year? Or maybe last mont with income data? Because of that, implementation of this column is a "Work in Progress". Right now, Last month income is equal to sum of incomes from december. User can't change it. Nevertheless a function that sum income have a parameter that controll a month of sum.
Right now, there is no validation of the year so function would add income from all decembers.

Searching:
If quantity of results is larger than 50 (number of records displayed on 1 site), all result will be displayed on site. If someone try to switch site or sort result, result of searcher will be no displayed untill at least 1 character from a search input will be removed or added.
Also, searching mechanism have a nested for loop. It has to be refactored in a future.

Testng:
Unit tests coverage = 0%.

Income (general):
I would advice to use integer as a representation of income, not floats. 108479 \*10^-2 insteed of 1084.79 Currently there is a possibility of error when performing calculations. Also I am not sure if performing potentialy processor heavy calculation, like counting average income, on a user side is the optimal solution.
