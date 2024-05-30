# Card Trader

A web app where users can buy and sell card for trading card games (TCGs).
The site currently contains a sample of cards for Star Wars: Unlimited but could be used for any card game

**Deployed at:** https://cardtrader.azurewebsites.net/ <br>
If no cards are shown at first, simply wait a minute and refresh the site. The cards will be shown properly once the database server has started. <br>

![CardTrader](https://github.com/Henrik-Ehde/CardTrader/assets/25432910/a85151cc-8770-42e9-80d4-eec04959b9bf)


Users can browse or search for a card, and find listings from other users who wants to sell one or more of that card.
When they pick a seller, they can see all cards available from that user, allowing them to conventiently buy multiple cards from the same seller and place an order.
Users can also create listings for cards that they want to sell.

Anyone can browse and search for cards. Users can also register an account and login which allows them to sell and buy cards.

The project contains a frontend created with React and an ASP.NET API connected to a database. The database and web app are deployed on azure
