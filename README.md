# Artful

## Calhacks Winner - Eluv.io Prize! 🎉 

## Inspiration

Each year, art forgery causes over **$6 billion in losses**. Museums, for example, cannot afford such detrimental costs. In an industry that has spanned centuries, it is crucial that transactions of art pieces can be completed securely and confidently. 

Introducing **Artful, a virtual marketplace for physical art which connects real-life artworks to secure NFTs on our own private blockchain**. With the power of the blockchain, the legitimacy of high-value real-world art pieces can be verified through an elegant and efficient web application, which with its scalability and decentralized framework, also proves as an efficient and secure measure for art dealership for all artists worldwide. 

## What it does

To join our system, art owners can upload a picture of their art through our portal. Once authenticated in person by our team of art verification experts, the art piece is automatically generated into an NFT and uploaded on the Eluv.io Ethereum blockchain. In essence, ownership of the NFT represents ownership of the real life artwork. 

From this point on, prospective buyers no longer need to consult expensive consultants, who charge hundreds of thousands to millions of dollars – they can simply visit the piece on our webapp and purchase it with full confidence in its legitimacy.

Artful serves a second purpose, namely for museums. According to the Museum Association, museum grant funding has dropped by over 20% over the last few years. As a result, museums have been forced to drop collections entirely, preventing public citizens from appreciating their beauty. 
Artful enables museums to create NFT and experiential bundles, which can be sold to the public as a method of fundraising. Through the Eluv.io fabric, experiences ranging from AR trips to games can be easily deployed on the blockchain, allowing for museums to sustain their offerings for years to come. 

## How we built it
	
We built a stylish and sleek frontend with Next.js, React, and Material UI. For our main backend, we utilized node.js and cockroachDB. At the core of our project is Eluv.io, powering our underlying Ethereum blockchain and personal marketplace. 

## Challenges we ran into

Initially, our largest challenge was developing a private blockchain that we could use for development. We tested out various services and ensuring the packages worked as expected was a common obstacle. Additionally, we were attempting to develop a custom NFT transfer smart contract with Solana, which was quite difficult. However, we soon found Eluv.io which eliminated these challenges and allowed us to focus development on our own platform.

Overall, our largest challenge was automation. Specifically, the integration of automatically processing an uploaded image, utilizing the Eluv.io content fabric to create marketplaces and content objects in a manner that worked well with our existing frontend modules, generating the NFTs using an automated workflow, and publishing the NFT to the blockchain proved to be quite difficult due to the number of moving parts. 
	

## Accomplishments that we're proud of

We’re incredibly proud of the scope and end-to-end completion of our website and application. Specifically, we’ve made a functional, working system which users can (today!) use to upload and purchase art through NFTs on our marketplace on an automated, scalable basis, including functionality for transactions, proof of ownership, and public listings. 
While it may have been possible to quit in the face of relentless issues in the back-end coding and instead pursue a more theoretical approach (in which we suggest functionality rather than implement it), we chose to persist, and it paid off. The whole chain of commands which previously required manual input through command line and terminal has been condensed into an automated process and contained to a single file of new code.

## What we learned

Through initially starting with a completely from scratch Ethereum private blockchain using geth and smart contracts in Solidity, we developed a grounding in how blockchains actually work and the extensive infrastructure that enables decentralization. Moreover,  we recognized the power of APIs in using Eluv.io’s architecture after learning it from the ground up. The theme of our project was fundamentally integration—finding ways to integrate our frontend user authentication and backend Eluv.io Ethereum blockchain, and seeing how to integrate the Eluv.io interface with our own custom web app. There were many technical challenges along the way in learning a whole new API, but through this journey, we feel much more comfortable with both our ability as programmers and our understanding of blockchain, a topic which before this hackathon, none of us had really developed familiarity with. By talking a lot with the Eluv.io CEO and founder who helped us tremendously with our project too, we learned a lot about their own goals and aspirations, and we can safely say that we’ve emerged from this hackathon with a much deeper appreciation and curiosity for blockchain and use cases of dapps. 
	

## What's next for Artful

Artful plans to incorporate direct communications with museums by building a more robust fundraising network, where donators can contribute to the restoration of art or the renovation of an exhibit by purchasing one of the many available copies of a specific NFT.  Also, we have begun implementing a database and blockchain tracking system, which museums can purchase to streamline their global collaboration as they showcase especially-famous pieces on a rotating basis. Fundamentally, we hope that our virtual center can act as a centralized hub for high-end art transfer worldwide, which through blockchain’s security, ensures the solidity (haha) of transactions will redefine the art buying/selling industry. Moreover, our website also acts as a proof of credibility as well — by connecting transactions with corresponding NFTs on the blockchain, we can ensure that every transaction occurring on our website is credible, and so as it scales up, the act of not using our website and dealing art underhandedly represents a loss of credibility. And most importantly, by integrating decentralization with the way high-end art NFTs are stored, we hope to bring the beautiful yet esoteric world of art to more people, further creating a platform for up and coming artists to establish their mark on a new age of digital creators. 
