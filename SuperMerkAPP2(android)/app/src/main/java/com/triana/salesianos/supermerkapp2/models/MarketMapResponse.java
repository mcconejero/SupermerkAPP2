package com.triana.salesianos.supermerkapp2.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class MarketMapResponse implements Serializable {

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
    private String[] categoryId;
    @SerializedName("productId")
    @Expose
    private String[] productId;

    public MarketMapResponse(String id, String name, String latlong, String[] categoryId, String[] productId) {
        this.id = id;
        this.name = name;
        this.latlong = latlong;
        this.categoryId = categoryId;
        this.productId = productId;
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

    public String getLatlong() {
        return latlong;
    }

    public void setLatlong(String latlong) {
        this.latlong = latlong;
    }

    public String[] getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String[] categoryId) {
        this.categoryId = categoryId;
    }

    public String[] getProductId() {
        return productId;
    }

    public void setProductId(String[] productId) {
        this.productId = productId;
    }

}
