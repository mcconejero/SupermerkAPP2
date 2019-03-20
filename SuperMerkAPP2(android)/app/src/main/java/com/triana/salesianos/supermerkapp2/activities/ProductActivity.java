package com.triana.salesianos.supermerkapp2.activities;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.fragments.ProductFragment;

public class ProductActivity extends AppCompatActivity {

    String mercadoId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Bundle extras = getIntent().getExtras();
        mercadoId = extras.getString("mercadoId");

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedorProduct, new ProductFragment())
                .commit();
    }

}
