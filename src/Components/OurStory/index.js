import React, { Component } from "react";
import "../../Assets/Styles/OurStory.css";
import { FcIdea } from "react-icons/fc";
import { FaAward } from "react-icons/fa6";
class OurStory extends Component {
  render() {
    return (
      <div className="ourstory-container">
        <div className="ourstory-heading">
          <h2>Stay Young</h2>
          <p style={{ fontSize: "16px", marginLeft: "5%", marginRight: "5%" }}>
            "My journey from dehydrated, dull skin to a plumped, healthy and
            confident outlook paved the way for Stay Young".
          </p>
          <p style={{ fontSize: "16px", textAlign: "end", width: "80%" }}>
            -Vikashini, Founder{" "}
          </p>
        </div>

        <div className="ourstory-content">
          <div>
            <div className="ourstory-details1">
              <p style={{ fontSize: "16px", marginTop: "1%", textIndent: '5%', }}>
              <span style={{ textIndent: '5%', display: 'block',textAlign:"justify" }}>
                Me and my friend Shree, better expressed as a dusky girl and an
                olive girl, respectively, have a long history with skin care. We
                both have sensitive skin and also the issues that it would bring
                along. It was very difficult for us to find skin care products
                that do not dehydrate, darken, or break our skin. We felt stuck
                with products and home remedies that did not cater to our
                skincare needs. Later, when I moved to South Korea, I discovered
                a new wonderland. Our search ended when I located K-beauty
                products. It suited my skin, and to my astonishment, it didn’t
                leave any white cast. I took a while to explore more K-beauty
                products, and the impact they had on my skin was marvelous. That
                is when I was more than thrilled to introduce Shree to the
                K-beauty world. We were stunned to find our skin having a
                healthy transformation. We embraced a culture of beauty that
                generations have perfected. As we delved deeper into this world,
                we were captivated by their unique formulations, emphasis on
                natural ingredients, innovative technologies, and meticulous
                attention to detail that Korean brands employ. Another
                impressive concern about K-beauty products is that they suit all
                skin types, especially sensitive skin. A common misconception is
                that Korean skincare products do not suit Indian skin, and we
                are a live example of breaking that notion. We found our skin
                gradually turning healthy, hydrated, and radiant as we made
                K-beauty products a part of our routine. We realized that the
                fairness of the skin doesn’t determine its healthiness; healthy
                skin is one that looks hydrated and plumped, and gives you a
                glow with or without makeup. That is precisely what these
                products have done to our skin. They also enhanced our
                self-confidence and made us feel beautiful inside out. I became
                more confident and comfortable with my bare face. We knew we had
                to share these treasures with beauty enthusiasts back home in
                India. Hence, we have embarked on a mission to bring the best of
                these products to your doorstep.
                </span>
              </p>
            </div>
          </div>

          <div className="ourstory-details">
            <h4 style={{ margin: "0", paddingTop: "2%",fontSize:"19px" }}>Why Stay Young?</h4>
            <p style={{ fontSize: "16px", marginTop: "1%", textIndent: '5%',textAlign:"justify" }}>
              Stay Young offers authentic Korean skincare, haircare, and body
              care products from trusted brands for lasting beauty. We at Stay
              Young consider your skincare not as a matter of luxury but as an
              element of self-care. In the current beauty market, selecting the
              right product for your skin requires careful consideration. This
              is where we come in. We have spent quite a while exploring the
              beauty market so that you can save precious time choosing the
              right product for your skin. We make sure that you end up with the
              perfect solution for your skincare. SY’s varied range of products
              undergoes three stages before reaching your doorstep to enable a
              remarkable beauty journey.
            </p>
          </div>
          <div className="ourstory-details">
            <h4 style={{ margin: "0", paddingTop: "2%",fontSize:"19px" }}>
              Cautious curation of beauty brands
            </h4>
            <p style={{ fontSize: "16px", marginTop: "1%", textIndent: '5%',textAlign:"justify" }}>
              We carefully curate every single brand of SY, considering their
              vision and mission statements, the experience of the products by
              people from different geographical locations, and the awards they
              have bagged. Our founder personally procures the products from
              South Korea, thereby ensuring authenticity. Apart from K-beauty
              products, we also curate brands that’re outstanding in India.
            </p>
          </div>
          <div className="ourstory-details">
            <h4 style={{ margin: "0", paddingTop: "2%",fontSize:"19px" }}>
              Ingredient analysis
            </h4>
            <p style={{ fontSize: "16px", marginTop: "1%", textIndent: '5%',textAlign:"justify" }}>
              We verify that the ingredients of our product provide calming and
              soothing effects and a healthy glow to the skin. We focus on
              providing our customers with gentle yet effective products.
            </p>
          </div>
          <div className="ourstory-details">
            <h4 style={{ margin: "0", paddingTop: "2%", borderRadius: "8%",fontSize:"19px" }}>
              Quality assurance
            </h4>
            <p style={{ fontSize: "16px", marginTop: "1%", textIndent: '5%',textAlign:"justify" }}>
              After scrutinizing the ingredients, every product is used and
              experienced by our team members. We examine all the possible
              outcomes it has on various Indian skin to ensure it meets our
              standards of excellence.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OurStory;
