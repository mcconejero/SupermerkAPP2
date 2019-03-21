package com.triana.salesianos.supermerkapp2.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.fragments.ProductFragment;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;

public class ProductActivity extends AppCompatActivity {

    CategoryResponse categoriaId;
    MarketResponse mercadoId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Bundle extras = getIntent().getExtras();
        categoriaId = (CategoryResponse) extras.getSerializable("categoriaId");

        /*Bundle extras2 = getIntent().getExtras();
        mercadoId = (MarketResponse) extras2.getSerializable("mercadoId");*/

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedorProduct, new ProductFragment(categoriaId))
                .commit();
    }

}
