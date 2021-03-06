import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";

import About from "../components/About";
import Menuitem from "../components/MenuItem";
import Viewcartbutton from "../components/ViewCartButton";
import IsorderloadingModal from "../Modals/IsOrderLoadingModal";

import Viewcartmodal from "../Modals/ViewCartModal";

import { setIsOrderLoading } from "../redux/actions";

import { foods } from "../utils/localData";

const Restaurantdetails = ({ route, cart, setIsOrderLoading }) => {
  const {
    selectedItems: { items: cartItems },
    isOrderLoading,
  } = cart;

  const bill =
    cartItems.length > 0
      ? cartItems
          .map((foodItem) => Number(foodItem.price.replace("$", "")))
          .reduce((prev, cur) => prev + cur)
      : 0;

  const [toggleModal, setToggleModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <About restaurant={route.params.restaurant} />
      <Divider width={1.8} />
      <FlatList
        data={foods}
        keyExtractor={(food, index) => String(index)}
        renderItem={(food) => (
          <Menuitem
            food={food.item}
            restaurantName={route.params.restaurant.name}
            itemsAddedToCart={cartItems}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginHorizontal: 40 }} />
        )}
      />
      <Viewcartbutton bill={bill} setToggleModal={setToggleModal} />

      <Viewcartmodal
        visible={toggleModal}
        setToggleModal={setToggleModal}
        cartItems={cartItems}
        bill={bill}
        restaurantName={route.params.restaurant.name}
      />
      <IsorderloadingModal
        visible={isOrderLoading}
        setIsOrderLoading={setIsOrderLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = ({ cart }) => {
  return { cart: cart };
};

export default connect(mapStateToProps, { setIsOrderLoading })(
  Restaurantdetails
);
