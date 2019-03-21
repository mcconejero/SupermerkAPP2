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

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryResponse getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(CategoryResponse categoryId) {
        this.categoryId = categoryId;
    }

    public MarketResponse getMarketId() {
        return marketId;
    }

    public void setMarketId(MarketResponse marketId) {
        this.marketId = marketId;
    }
}
