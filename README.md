# iexTrading

SUMMARY: This is a single-page application that pulls stock information through the IEX API and displays it in a simple-to-read format.

NOTE: As this application was created to demonstrate the power of dynamically created buttons, please use the mouse to click on all options: functionality for the "Enter" key has not been added as it would interfere with various features detailed below.

BASIC USE:

Start Up - initially, you will have a selection of four different stocks available for viewing. Clicking a button will populate the page with stock information (closing price, opening, sale price, etc.) as well as the logo, name, and up to ten of the most relevant news articles regarding that company.

Adding Stock - to add more stocks to list of buttons, simply type in the stock symbol (ex: GOOG, IBM, MCD) and click the Add button to the right of the input bar. This will dynamically created a new button and add it to the list.

Delete Stock - to remove a button from the list, simply type in the stock symbol and press the Delete button to the left of the input bar.

KEY FEATURES:
Local Storage - a key feature of this application is that it saves the user's data. By using local storage, a user can create a specific list of stock (i.e. his/her personal portfolio) and have it available every time the application is re-opened.

Stock Validation - the input box has been referenced to the IEX stock index of over eight thousand tradable symbols. If the symbol does not appear in this database, no new button will appear. Similarly, once a stoc has been entered into the button list, the application will prevent a duplicate from being created in order to stop redundancy.

Mobile Responsiveness - the page has been created to scale down and remain properly formatted for all screen sizes. Whether on desktop, tablet, or cellphone, this application remains aesthetic and easy to use.

Stark Power - the color palette has been pulled directly from Iron Man's gold and candy-apple red scheme to channel his phenomenal business prowess.
