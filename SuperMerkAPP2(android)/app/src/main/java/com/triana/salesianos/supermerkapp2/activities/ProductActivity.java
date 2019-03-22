package com.triana.salesianos.supermerkapp2.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.fragments.ProductFragment;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;

public class ProductActivity extends AppCompatActivity {

    CategoryResponse categoriaId;
    FloatingActionButton fabBack;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Bundle extras = getIntent().getExtras();
        categoriaId = (CategoryResponse) extras.getSerializable("categoriaId");

        fabBack = findViewById(R.id.floatingActionButtonProduct);

        fabBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProductActivity.this, DashboardActivity.class));
                finish();
            }
        });

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedorProduct, new ProductFragment(categoriaId))
                .commit();
    }

}
