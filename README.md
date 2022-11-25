# metricell-test

Implemented functionalities.
1. Retrieve and display employees list.
2. Perform CRUD operation - create, read and update, delete employees.
3. As soon the database is modified, front end is re-rendered and reloaded with updated data.
4. Option to Increment employee values:
	Increment value by 1 WHERE Name LIKE 'E%' 
	Increment value by 10 WHERE Name LIKE 'G%'
	Increment value by 100 WHERE Name NOT LIKE 'E%' AND Name NOT LIKE 'G%'
5. Retrieve list data - summation of values where employee name begins with A or B or C and sum of values greater than or equal to 11171

Improvements that can be added:
note: this implementation focued on developing given main functionalities. Due to time constraints I didn't have time to implement following improvements.
1. Front end - user interface design and UX experience can  be improved by adding validation, pagination, navigation, UX accessebility and best practices, etc.
2. Service layer's API method parameters could be sanitized to prevent SQL injection
3. Business logic can be improved by introducing two new layers - services and repository
4. Overall front end and backend validation for error handling can be improved
