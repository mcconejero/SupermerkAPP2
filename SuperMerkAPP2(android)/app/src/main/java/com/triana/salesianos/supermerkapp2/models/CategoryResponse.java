package com.triana.salesianos.supermerkapp2.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class CategoryResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("picture")
    @Expose
    private String picture;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("marketId")
    @Expose
    private MarketResponse marketId;
    @SerializedName("productId")
    @Expose
    private String[] productId;

    public CategoryResponse(String id, String picture, String name, String message, MarketResponse marketId, String[] productId) {
        this.id = id;
        this.picture = picture;
        this.name = name;
        this.message = message;
        this.marketId = marketId;
        this.productId = productId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MarketResponse getMarketId() {
        return marketId;
    }

    public void setMarketId(MarketResponse marketId) {
        this.marketId = marketId;
    }

    public String[] getProductId() {
        return productId;
    }

    public void setProductId(String[] productId) {
        this.productId = productId;
    }
}
