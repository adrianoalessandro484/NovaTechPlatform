using Microsoft.EntityFrameworkCore;
using NovaTechPlatform.Domain.Entities;

namespace NovaTechPlatform.Infrastructure.Data;

/// <summary>Contexto de Entity Framework Core para PostgreSQL.</summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios => Set<Usuario>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>(entidad =>
        {
            entidad.ToTable("Usuario");
            entidad.HasKey(u => u.Cod_Usuario);

            entidad.Property(u => u.Cod_Usuario)
                .HasColumnName("Cod_Usuario")
                .ValueGeneratedOnAdd();

            entidad.Property(u => u.Cor_Usuario)
                .HasColumnName("Cor_Usuario")
                .HasMaxLength(150)
                .IsRequired();

            entidad.HasIndex(u => u.Cor_Usuario).IsUnique();

            entidad.Property(u => u.Clv_Usuario)
                .HasColumnName("Clv_Usuario")
                .HasMaxLength(255)
                .IsRequired();

            entidad.Property(u => u.Nom_Usuario)
                .HasColumnName("Nom_Usuario")
                .HasMaxLength(100)
                .IsRequired();

            entidad.Property(u => u.Ape_Usuario)
                .HasColumnName("Ape_Usuario")
                .HasMaxLength(100)
                .IsRequired();

            entidad.Property(u => u.Est_Usuario)
                .HasColumnName("Est_Usuario")
                .HasDefaultValue(true)
                .IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }
}
