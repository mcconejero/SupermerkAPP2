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

    public CategoryResponse setId(String id) {
        this.id = id;
        return this;
    }

    public String getPicture() {
        return picture;
    }

    public CategoryResponse setPicture(String picture) {
        this.picture = picture;
        return this;
    }

    public String getName() {
        return name;
    }

    public CategoryResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public CategoryResponse setMessage(String message) {
        this.message = message;
        return this;
    }

    public MarketResponse getMarketId() {
        return marketId;
    }

    public CategoryResponse setMarketId(MarketResponse marketId) {
        this.marketId = marketId;
        return this;
    }

    public String[] getProductId() {
        return productId;
    }

    public CategoryResponse setProductId(String[] productId) {
        this.productId = productId;
        return this;
    }
}
