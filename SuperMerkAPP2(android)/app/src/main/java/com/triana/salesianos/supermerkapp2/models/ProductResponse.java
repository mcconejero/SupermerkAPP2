package com.triana.salesianos.supermerkapp2.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class ProductResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("categoryId")
    @Expose
    private CategoryResponse categoryId;
    @SerializedName("marketId")
    @Expose
    private MarketResponse marketId;

    public ProductResponse(String id, String name, CategoryResponse categoryId, MarketResponse marketId) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.marketId = marketId;
    }

    public String getId() {
        return id;
    }

    public ProductResponse setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProductResponse setName(String name) {
        this.name = name;
        return this;
    }

    public CategoryResponse getCategoryId() {
        return categoryId;
    }

    public ProductResponse setCategoryId(CategoryResponse categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public MarketResponse getMarketId() {
        return marketId;
    }

    public ProductResponse setMarketId(MarketResponse marketId) {
        this.marketId = marketId;
        return this;
    }
}
