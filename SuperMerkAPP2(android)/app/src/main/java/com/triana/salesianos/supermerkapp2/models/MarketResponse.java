package com.triana.salesianos.supermerkapp2.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class MarketResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("latlong")
    @Expose
    private String latlong;
    @SerializedName("categoryId")
    @Expose
    private CategoryResponse categoryId;
    @SerializedName("productId")
    @Expose
    private ProductResponse productId;

    public MarketResponse(String id, String name, String latlong, CategoryResponse categoryId, ProductResponse productId) {
        this.id = id;
        this.name = name;
        this.latlong = latlong;
        this.categoryId = categoryId;
        this.productId = productId;
    }

    public String getId() {
        return id;
    }

    public MarketResponse setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public MarketResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getLatlong() {
        return latlong;
    }

    public MarketResponse setLatlong(String latlong) {
        this.latlong = latlong;
        return this;
    }

    public CategoryResponse getCategoryId() {
        return categoryId;
    }

    public MarketResponse setCategoryId(CategoryResponse categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public ProductResponse getProductId() {
        return productId;
    }

    public MarketResponse setProductId(ProductResponse productId) {
        this.productId = productId;
        return this;
    }
}
